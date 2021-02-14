/* eslint-disable @typescript-eslint/no-unused-vars */
import firebase from 'firebase';
import AuthApi from '../AuthApi';
import { BasicErrors, WithError } from '../BaseApi';
import TeacherApi from '../TeacherApi';
import AccountInfo, { AccountInfoProps } from '../model/AccountInfo';
import TeacherClassModel, {
  TeacherClassModelProps,
} from '../TeacherApi/model/TeacherClassModel';
import SessionInfoModel, {
  SessionInfoInterface,
} from '../TeacherApi/model/SessionInfoModel';
import SessionStudentModel, {
  SessionStudentInterface,
} from '../TeacherApi/model/SessionStudentModel';
import { UserRole } from '../index';
import ClassStudentModel from '../TeacherApi/model/ClassStudentModel';
import { hashMacId } from '../util/hash';

interface StudentApiInterface {
  /**
   * validate if the user can join the class
   * @param classCode
   * @param rollNo
   */
  validateClassJoin(
    classCode: string,
    rollNo: string,
  ): Promise<WithError<boolean>>;

  /**
   * join the class
   * @param classId
   * @param rollNo
   */
  joinClass(classId: string, rollNo: string): Promise<WithError<boolean>>;

  /**
   * get the list of all enrolled class list
   * @param page
   */
  getEnrolledClassList(page: number): Promise<WithError<TeacherClassModel[]>>;

  // TODO: get the class info from TeacherApi ?
  // getClassInfo(classCode: string): ClassInfo;

  /**
   * give present to the class session
   * @param classId
   * @param sessionId
   * @param macId
   */
  giveResponse(
    classId: string,
    sessionId: string,
    macId: string,
  ): Promise<WithError<boolean>>;

  /**
   * get attendance report of a class
   * @param classId
   */
  getAttendanceReport(
    classId: string,
  ): Promise<WithError<SessionStudentModel[]>>;
}

// noinspection JSUnusedLocalSymbols
export default class StudentApi extends AuthApi implements StudentApiInterface {
  static readonly ROOT_COLLECTION_NAME = 'students';

  validateClassJoin = async (
    classCode: string,
    rollNo: string,
  ): Promise<WithError<boolean>> => {
    try {
      if (!classCode) return this.error(BasicErrors.INVALID_INPUT);

      const doc = firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .where('classCode', '==', classCode)
        .where('isActiveInvite', '==', true);

      const data = await doc.get();

      // console.log(data.docs.map(e => e.data()));

      return this.success(data.docs.length > 0);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getAllJoinedClassId = async (): Promise<WithError<string[]>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const doc = await firebase
        .firestore()
        .collection(AuthApi.AUTH_ROOT_COLLECTION_NAME)
        .doc(userId)
        .get();

      const data = (doc.data() as unknown) as AccountInfoProps;
      const accInfo = new AccountInfo(data);

      return this.success(accInfo.joinedClassId ?? []);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  joinClass = async (
    classId: string,
    rollNo: string,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      // add class id to acc metadata
      const chunkUpdate = (firebase.firestore.FieldValue.arrayUnion(
        classId,
      ) as unknown) as string[];

      await firebase
        .firestore()
        .collection(AuthApi.AUTH_ROOT_COLLECTION_NAME)
        .doc(userId)
        .update(
          AccountInfo.Update({
            joinedClassId: chunkUpdate,
          }),
        );

      // add the student to teacher class

      const studentInfo = new ClassStudentModel({
        joined: true,
        rollNo,
        joinedDate: new Date(),
        studentId: userId,
        totalAttendancePercentage: 0,
      });

      await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .collection(TeacherApi.CLASSES_JOINED_STUDENT_COLLECTION_NAME)
        .doc(studentInfo.studentId ?? '')
        .set(studentInfo.toJson());

      return this.success(true);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getEnrolledClassList = async (
    page: number,
  ): Promise<WithError<TeacherClassModel[]>> => {
    const [ids] = await this.getAllJoinedClassId();

    const docs = await firebase
      .firestore()
      .collection(TeacherApi.CLASSES_COLLECTION_NAME)
      .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
      .get();
    // TODO: add pagination

    const data = docs.docs.map(
      doc =>
        new TeacherClassModel({
          ...((doc.data() as unknown) as TeacherClassModelProps),
          classId: doc.id,
        }),
    );

    return this.success(data);
    // throw new Error('Method not implemented.');
  };

  giveResponse = async (
    classId: string,
    sessionId: string,
    macId: string,
  ): Promise<WithError<boolean>> => {
    const userId = this.getUserUid();

    if (userId === null) return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

    // get the class
    const teacherClassData = await firebase
      .firestore()
      .collection(TeacherApi.CLASSES_COLLECTION_NAME)
      .doc(classId)
      .get();

    const teacherClass = new TeacherClassModel(
      (teacherClassData?.data() as unknown) as TeacherClassModelProps,
    );

    const { currentSessionId } = teacherClass;

    // get current session
    const currentSessionDoc = await firebase
      .firestore()
      .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
      .doc(currentSessionId ?? '')
      .get();

    const sessionInfo = new SessionInfoModel(
      (currentSessionDoc.data() as unknown) as SessionInfoInterface,
    );

    const hashMac = hashMacId(classId, macId);

    if (sessionInfo.macId !== hashMac)
      return this.error(BasicErrors.MAC_ID_DOES_NOT_MATCH);
    // TODO: check if the student already give response the update it or else insert new.
    // give present
    await firebase
      .firestore()
      .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
      .add(
        new SessionStudentModel({
          whom: UserRole.STUDENT,
          studentId: userId,
          sessionTime: new Date(),
          present: true,
          lastUpdateTime: new Date(),
          sessionId,
          classId,
        }).toJson(),
      );

    return this.success(true);
    // throw new Error('Method not implemented.');
  };

  getAttendanceReport = async (
    classId: string,
  ): Promise<WithError<SessionStudentModel[]>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      // get session list
      const currentSessionDocs = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
        .where('classId', '==', classId)
        .where('studentId', '==', userId)
        .get();

      const sessions: SessionStudentModel[] = currentSessionDocs.docs.map(
        doc =>
          new SessionStudentModel(
            (doc.data() as unknown) as SessionStudentInterface,
          ),
      );

      return this.success(sessions);
    } catch (ex) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };
}

export const studentApi = new StudentApi();

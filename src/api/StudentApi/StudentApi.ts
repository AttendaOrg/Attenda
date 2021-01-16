/* eslint-disable @typescript-eslint/no-unused-vars */
import firebase from 'firebase';
import AuthApi from '../AuthApi';
import { BasicErrors, WithError } from '../BaseApi';
import TeacherApi from '../TeacherApi';
import AccountInfo, { AccountInfoProps } from '../model/AccountInfo';
import TeacherClassModel, {
  TeacherClassModelProps,
} from '../TeacherApi/model/TeacherClassModel';

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
   * @param classCode
   * @param rollNo
   */
  joinClass(classCode: string, rollNo: string): Promise<WithError<boolean>>;

  /**
   * get the list of all enrolled class list
   * @param page
   * @returns unknown TODO: figure out the data structure
   */
  getEnrolledClassList(page: number): Promise<WithError<TeacherClassModel[]>>;

  // TODO: get the class info from TeacherApi ?
  // getClassInfo(classCode: string): ClassInfo;

  /**
   * give present to the class session
   * @param classId
   * @param sessionId
   * TODO: don't send the mac id to the server send a hash of it for privacy reason
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
   * @returns unknown TODO: figure out the data structure
   */
  getAttendanceReport(classId: string): Promise<WithError<unknown>>;
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

      const doc = await firebase
        .firestore()
        .collectionGroup(TeacherApi.CLASSES_COLLECTION_NAME)
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
    classCode: string,
    rollNo: string,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      // add class id to acc metadata
      const chunkUpdate = (firebase.firestore.FieldValue.arrayUnion(
        classCode,
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

      // TODO: add the student to teacher class

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
      .collectionGroup(TeacherApi.CLASSES_COLLECTION_NAME)
      .where('classCode', 'in', ids)
      .orderBy('classCode')
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

  giveResponse = (
    classId: string,
    sessionId: string,
    macId: string,
  ): Promise<WithError<boolean>> => {
    throw new Error('Method not implemented.');
  };

  getAttendanceReport = (classId: string): Promise<WithError<unknown>> => {
    throw new Error('Method not implemented.');
  };
}

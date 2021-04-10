/* eslint-disable @typescript-eslint/no-unused-vars */
import firebase from 'firebase';
import AuthApi from '../AuthApi';
import {
  BasicErrors,
  RealTimeListenerUnSubscriber,
  WithError,
} from '../BaseApi';
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
import ClassStudentModel, {
  ClassStudentModelInterface,
} from '../TeacherApi/model/ClassStudentModel';
import { hashMacId } from '../util/hash';
import { getMonthRange } from '../../util';

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
   * get joined class info
   * @param classId
   */
  getJoinedClassInfo(classId: string): Promise<WithError<ClassStudentModel>>;

  /**
   * get the list of all enrolled class list
   * @param page
   */
  getEnrolledClassList(page: number): Promise<WithError<TeacherClassModel[]>>;

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
   * @param month
   */
  getAttendanceReport(
    classId: string,
    month: Date,
  ): Promise<WithError<SessionStudentModel[]>>;

  /**
   *
   */
  getEnrolledClassListListener(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onDataChange: (newData: TeacherClassModel[]) => void,
  ): RealTimeListenerUnSubscriber;

  /**
   * given the session ids add a listener for getting classIds
   * in which class student has given present
   * @param sessionId `string[]`
   * @param cb `(givenPresenceClassId: string[]) => void`
   */
  getPresentClassId(
    sessionId: string[],
    cb: (givenPresenceClassId: string[]) => void,
  ): RealTimeListenerUnSubscriber;

  /**
   * leave the joined class
   * @param classId
   */
  leaveClass(classId: string): Promise<WithError<boolean>>;
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

  getJoinedClassInfo = async (
    classId: string,
  ): Promise<WithError<ClassStudentModel>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const doc = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .collection(TeacherApi.CLASSES_JOINED_STUDENT_COLLECTION_NAME)
        .doc(userId)
        .get();
      const data = (doc.data() as unknown) as ClassStudentModelInterface;
      const classStudentModel = new ClassStudentModel(data);

      return this.success(classStudentModel);
    } catch (error) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  joinClass = async (
    classId: string,
    rollNo: string,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();
      const displayName = this.getUserDisplayName();

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
        studentName: displayName,
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

  leaveClass = async (classId: string): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      // add class id to acc metadata
      const chunkUpdate = (firebase.firestore.FieldValue.arrayRemove(
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

      // QUESTION: what more should we do if a student leaves a class ?
      // delete there data, notify the teacher?

      return this.success(true);
    } catch (error) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getEnrolledClassListListener = (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onDataChange = (_newData: TeacherClassModel[]) => {},
  ): RealTimeListenerUnSubscriber => {
    const error = () => console.error('error');
    let unSubscribeAccInfo = () => console.info('un implemented');

    try {
      const userId = this.getUserUid();

      if (userId === null) return error;

      const query = firebase
        .firestore()
        .collection(AuthApi.AUTH_ROOT_COLLECTION_NAME)
        .doc(userId);

      unSubscribeAccInfo = query.onSnapshot(async snapshot => {
        // TODO: find way to optimize the query to only include update or inserted or deleted data
        const data = snapshot.data();
        const accInfo = new AccountInfo((data as unknown) as AccountInfoProps);

        console.log(accInfo.joinedClassId);

        // it the student hasn't enrolled in any class don't execute
        // the query because firebase in query expect a not empty array
        if (
          accInfo.joinedClassId === null ||
          accInfo.joinedClassId?.length === 0
        )
          onDataChange([]);
        else {
          const query2 = await firebase
            .firestore()
            .collection(TeacherApi.CLASSES_COLLECTION_NAME)
            .where(
              firebase.firestore.FieldPath.documentId(),
              'in',
              accInfo.joinedClassId,
            );

          // BUG: potential bug maybe clear out the listener ?
          query2.onSnapshot(snapshot2 => {
            const { docs } = snapshot2;
            const newClasses = docs.map(
              classModel =>
                new TeacherClassModel({
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ...(classModel.data() as any),
                  classId: classModel.id,
                }),
            );

            onDataChange(newClasses);
          });
        }
      });

      return unSubscribeAccInfo;
    } catch (ex) {
      // console.log(ex);

      return error;
    }
  };

  getEnrolledPercentageListener = (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onDataChange = (_newData: ClassStudentModel[]) => {},
  ): RealTimeListenerUnSubscriber => {
    const error = () => console.error('error');
    let unSubscribeAccInfo = () => console.info('un implemented');

    try {
      const userId = this.getUserUid();

      if (userId === null) return error;

      const query = firebase
        .firestore()
        .collectionGroup(TeacherApi.CLASSES_JOINED_STUDENT_COLLECTION_NAME)
        .where('studentId', '==', userId);

      unSubscribeAccInfo = query.onSnapshot(async snapshot => {
        // TODO: find way to optimize the query to only include update or inserted or deleted data
        const percentageModel: ClassStudentModel[] = snapshot.docs.map(e => {
          const data = e.data() as ClassStudentModelInterface;
          const model = new ClassStudentModel(data);

          model.setClassId(e?.ref?.parent?.parent?.id ?? null);

          return model;
        });

        onDataChange(percentageModel);
      });

      return unSubscribeAccInfo;
    } catch (ex) {
      // console.log(ex);

      return error;
    }
  };

  getEnrolledClassList = async (
    page: number,
  ): Promise<WithError<TeacherClassModel[]>> => {
    const [ids] = await this.getAllJoinedClassId();

    // it the student hasn't enrolled in any class don't execute
    // the query because firebase in query expect a not empty array
    if (ids !== null && ids.length === 0) return this.success([]);

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
    const displayName = this.getUserDisplayName();

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

    const queryPresentGiven = await firebase
      .firestore()
      .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
      .where('studentId', '==', userId)
      .where('sessionId', '==', sessionId)
      .where('classId', '==', classId)
      .get();

    // because we are adding default user on every class start
    if (queryPresentGiven.docs.length === 1) {
      // we found a document
      const [userData] = queryPresentGiven.docs;
      const q = (userData.data() as unknown) as SessionStudentInterface;
      const studentUser = new SessionStudentModel(q);

      if (studentUser.present === false) {
        await userData.ref.update(
          SessionStudentModel.Update({
            present: true,
          }),
        );
      } else {
        return this.error(BasicErrors.ALREADY_PRESENT_GIVEN);
      }
    } else {
      // for some reason there is no document
      // just add a document
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
            studentName: displayName,
          }).toJson(),
        );
    }

    // if (queryPresentGiven.docs.length === 0) {
    //   // there is no attendance record for the session insert an record
    //   // or don't do anything because the student doesn't have the permission to update the field
    //   await firebase
    //     .firestore()
    //     .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
    //     .add(
    //       new SessionStudentModel({
    //         whom: UserRole.STUDENT,
    //         studentId: userId,
    //         sessionTime: new Date(),
    //         present: true,
    //         lastUpdateTime: new Date(),
    //         sessionId,
    //         classId,
    //         studentName: displayName,
    //       }).toJson(),
    //     );
    // } else {
    //   return this.error(BasicErrors.ALREADY_PRESENT_GIVEN);
    // }

    return this.success(true);
    // throw new Error('Method not implemented.');
  };

  getPresentClassId = (
    sessionId: string[],
    cb: (givenPresenceClassId: string[]) => void,
  ): RealTimeListenerUnSubscriber => {
    if (sessionId.length === 0) return () => null;

    const userId = this.getUserUid();
    const unSubscribe = firebase
      .firestore()
      .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
      .where('sessionId', 'in', sessionId)
      .where('studentId', '==', userId)
      .where('present', '==', true)
      .onSnapshot(snapshot => {
        const { docs } = snapshot;
        const data = docs
          .map(
            e =>
              new SessionStudentModel(
                (e.data() as unknown) as SessionStudentInterface,
              ),
          )
          .map(e => e.classId);

        cb(data);
      });

    return unSubscribe;
  };

  getAttendanceReport = async (
    classId: string,
    month: Date,
  ): Promise<WithError<SessionStudentModel[]>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const [startDayOfTheMonth, nextMonthStartDay] = getMonthRange(month);

      // get session list
      const currentSessionDocs = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
        .where('classId', '==', classId)
        .where('studentId', '==', userId)
        .where('sessionTime', '>=', startDayOfTheMonth)
        .where('sessionTime', '<', nextMonthStartDay)
        .orderBy('sessionTime')
        .get();

      const sessions: SessionStudentModel[] = currentSessionDocs.docs.map(
        doc => {
          const data: firebase.firestore.DocumentData = doc.data();

          return new SessionStudentModel({
            ...((data as unknown) as SessionStudentInterface),
            sessionTime: data.sessionTime.toDate(),
          });
        },
      );

      return this.success(sessions);
    } catch (ex) {
      console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };
}

export const studentApi = new StudentApi();

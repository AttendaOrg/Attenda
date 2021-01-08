/* eslint-disable @typescript-eslint/no-unused-vars */
import firebase from 'firebase';
import AuthApi from '../AuthApi';
import { BasicErrors, WithError } from '../BaseApi';
import TeacherClass from './model/TeacherClass';

interface TeacherApiInterface {
  //#region class
  /**
   * given teacher class create a class
   * @param teacherClass
   * @returns **classId** of the created class
   */
  createClass(teacherClass: TeacherClass): Promise<WithError<string>>;

  /**
   * update class information by class id
   * @param classId
   * @param teacherClass
   */
  updateClass(
    classId: string,
    teacherClass: TeacherClass,
  ): Promise<WithError<boolean>>;

  /**
   * checks if the class exist by class id
   * @param classId
   */
  isClassExist(classId: string): Promise<WithError<boolean>>;

  /**
   * gets class info given by class info
   * @param classId
   */
  getClassInfo(classId: string): Promise<WithError<TeacherClass>>;

  /**
   * get all class of the teacher
   * @param page
   */
  getAllClass(page: string): Promise<WithError<TeacherClass[]>>;

  /**
   * change the status of the invite link\
   * if false the invite code will not work
   * @param classId
   * @param enabled
   */
  changeInviteCodeEnableStatus(
    classId: string,
    enabled: boolean,
  ): Promise<WithError<boolean>>;

  //#endregion class

  //#region invite
  /**
   * given the classId and email list invite students
   * @param classId
   * @param emails
   */
  inviteStudent(classId: string, emails: string[]): Promise<WithError<boolean>>;

  /**
   * given the classId get the status of the invite student.
   * @param classId
   * @returns unknown TODO: figure out the data structure
   */
  getInviteStatus(classId: string): Promise<WithError<unknown[]>>;

  /**
   * given the classId get All student enrolled in a class
   * @param classId
   * @returns unknown TODO: figure out the data structure
   */
  getAllStudentList(classId: string): Promise<WithError<unknown[]>>;

  //#endregion invite

  //#region class_session
  /**
   * start a class session
   * @param classId
   * TODO: don't send the mac id to the server send a hash of it for privacy reason
   * @param macId
   * @param date
   * @returns **sessionId**
   */
  startClassSession(
    classId: string,
    macId: string,
    date: Date,
  ): Promise<WithError<string>>;

  /**
   * end the class session and save the session
   * @param classId
   * @param sessionId
   */
  saveClassSession(
    classId: string,
    sessionId: string,
  ): Promise<WithError<boolean>>;

  /**
   * end the session and discard all result
   * @param classId
   */
  discardClassSession(classId: string): Promise<WithError<boolean>>;

  //#endregion class_session

  //#region attendance_report
  /**
   * gets the attendance report of the class by month
   * @param classId
   * @param month number 0 - 11
   * @returns unknown TODO: figure out the data structure
   */
  getClassAttendanceReport(
    classId: string,
    month: number,
  ): Promise<WithError<unknown>>;

  /**
   * get summery of all student's attendance report
   * @param classId
   * @returns unknown TODO: figure out the data structure
   */
  getAllStudentAttendanceSummery(classId: string): Promise<WithError<unknown>>;

  /**
   * gets the attendance report if a student by month
   * @param classId
   * @param studentId
   * @param month number 0 - 11
   * @returns unknown TODO: figure out the data structure
   */
  getStudentAttendanceReport(
    classId: string,
    studentId: string,
    month: number,
  ): Promise<WithError<unknown>>;

  /**
   * change student attendance report of a particular session
   * @param classId
   * @param sessionId
   * @param studentId
   * @param status present of absent
   */
  editStudentAttendanceReport(
    classId: string,
    sessionId: string,
    studentId: string,
    status: boolean,
  ): Promise<WithError<boolean>>;

  //#endregion attendance_report
}

// noinspection JSUnusedLocalSymbols
export default class TeacherApi extends AuthApi implements TeacherApiInterface {
  static readonly ROOT_COLLECTION_NAME = 'teachers';

  static readonly CLASSES_COLLECTION_NAME = 'classes';

  //#region class
  createClass = async (
    teacherClass: TeacherClass,
  ): Promise<WithError<string>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const doc = await firebase
        .firestore()
        .collection(TeacherApi.ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .add(teacherClass.toJson());

      return this.success(doc.id);
    } catch (ex) {
      // console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  updateClass = async (
    classId: string,
    teacherClass: TeacherClass,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      await firebase
        .firestore()
        .collection(TeacherApi.ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .update(teacherClass.toJson());

      return this.success(true);
    } catch (ex) {
      // console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  isClassExist = async (classId: string): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const doc = await firebase
        .firestore()
        .collection(TeacherApi.ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .get();

      return this.success(doc.exists);
    } catch (error) {
      // console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getClassInfo = (classId: string): Promise<WithError<TeacherClass>> => {
    throw new Error('Method not implemented.');
  };

  getAllClass = async (): Promise<WithError<TeacherClass[]>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const classes = await firebase
        .firestore()
        .collection(TeacherApi.ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .get();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cc = classes.docs.map(e => new TeacherClass(e.data() as any));

      return this.success(cc);
    } catch (ex) {
      // console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  changeInviteCodeEnableStatus = (
    classId: string,
    enabled: boolean,
  ): Promise<WithError<boolean>> => {
    throw new Error('Method not implemented.');
  };

  //#endregion class

  //#region invite
  inviteStudent = (
    classId: string,
    emails: string[],
  ): Promise<WithError<boolean>> => {
    throw new Error('Method not implemented.');
  };

  getInviteStatus = (classId: string): Promise<WithError<unknown[]>> => {
    throw new Error('Method not implemented.');
  };

  getAllStudentList = (classId: string): Promise<WithError<unknown[]>> => {
    throw new Error('Method not implemented.');
  };
  //#endregion invite

  //#region class_session
  startClassSession = (
    classId: string,
    macId: string,
    date: Date,
  ): Promise<WithError<string>> => {
    throw new Error('Method not implemented.');
  };

  saveClassSession = (
    classId: string,
    sessionId: string,
  ): Promise<WithError<boolean>> => {
    throw new Error('Method not implemented.');
  };

  discardClassSession = (classId: string): Promise<WithError<boolean>> => {
    throw new Error('Method not implemented.');
  };
  //#endregion class_session

  //#region attendance_report
  getClassAttendanceReport = (
    classId: string,
    month: number,
  ): Promise<WithError<unknown>> => {
    throw new Error('Method not implemented.');
  };

  getAllStudentAttendanceSummery = (
    classId: string,
  ): Promise<WithError<unknown>> => {
    throw new Error('Method not implemented.');
  };

  getStudentAttendanceReport = (
    classId: string,
    studentId: string,
    month: number,
  ): Promise<WithError<unknown>> => {
    throw new Error('Method not implemented.');
  };

  editStudentAttendanceReport = (
    classId: string,
    sessionId: string,
    studentId: string,
    status: boolean,
  ): Promise<WithError<boolean>> => {
    throw new Error('Method not implemented.');
  };
  //#endregion attendance_report
}

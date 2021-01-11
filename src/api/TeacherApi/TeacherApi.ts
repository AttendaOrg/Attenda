/* eslint-disable @typescript-eslint/no-unused-vars */
import firebase from 'firebase';
import AuthApi from '../AuthApi';
import { BasicErrors, WithError } from '../BaseApi';
import TeacherClassModel, {
  TeacherClassModelProps,
} from './model/TeacherClassModel';
import ClassStudentModel from './model/ClassStudentModel';
import SessionInfoModel from './model/SessionInfoModel';
import SessionStudentModel from './model/SessionStudentModel';

interface TeacherApiInterface {
  //#region class
  /**
   * given teacher class create a class
   * @param teacherClass
   * @returns **classId** of the created class
   */
  createClass(teacherClass: TeacherClassModel): Promise<WithError<string>>;

  /**
   * update class information by class id
   * @param classId
   * @param teacherClass
   */
  updateClass(
    classId: string,
    teacherClass: TeacherClassModel,
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
  getClassInfo(classId: string): Promise<WithError<TeacherClassModel>>;

  /**
   * get all class of the teacher
   * @param page
   */
  getAllClass(page: string): Promise<WithError<TeacherClassModel[]>>;

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
   * @param SessionId:
   */
  discardClassSession(
    classId: string,
    sessionId: string,
  ): Promise<WithError<boolean>>;

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
  static readonly TEACHER_ROOT_COLLECTION_NAME = 'teachers';

  static readonly CLASSES_COLLECTION_NAME = 'classes';

  static readonly CLASSES_STUDENT_COLLECTION_NAME = 'students';

  static readonly CLASSES_SESSIONS_COLLECTION_NAME = 'sessions';

  static readonly CLASSES_SESSIONS_STUDENT_COLLECTION_NAME =
    'sessions_students';

  //#region class
  createClass = async (
    teacherClass: TeacherClassModel,
  ): Promise<WithError<string>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const doc = await firebase
        .firestore()
        .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .add(teacherClass.toJson());

      return this.success(doc.id);
    } catch (ex) {
      // console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getClassInfo = async (
    classId: string,
  ): Promise<WithError<TeacherClassModel>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const doc = await firebase
        .firestore()
        .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .get();

      const data = doc.data();

      if (!data) return this.error(BasicErrors.NO_CLASS_FOUND);

      const classModel = new TeacherClassModel(
        (data as unknown) as TeacherClassModelProps,
      );

      return this.success(classModel);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  updateClass = async (
    classId: string,
    teacherClass: Partial<TeacherClassModelProps>,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      await firebase
        .firestore()
        .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .update(teacherClass);

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
        .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
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

  getAllClass = async (): Promise<WithError<TeacherClassModel[]>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const classes = await firebase
        .firestore()
        .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .get();

      const allClass = classes.docs.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        classModel => new TeacherClassModel(classModel.data() as any),
      );

      return this.success(allClass);
    } catch (ex) {
      // console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  changeInviteCodeEnableStatus = async (
    classId: string,
    enabled: boolean,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const updateData = TeacherClassModel.Update({
        isActiveInvite: enabled,
      });

      const doc = await firebase
        .firestore()
        .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .update(updateData);

      return this.success(true);
    } catch (error) {
      // console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  //#endregion class

  //#region invite

  inviteStudent = async (
    classId: string,
    emails: string[],
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const batch = firebase.firestore().batch();

      emails.forEach(email => {
        const ref = firebase
          .firestore()
          .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
          .doc(userId)
          .collection(TeacherApi.CLASSES_COLLECTION_NAME)
          .doc(classId)
          .collection(TeacherApi.CLASSES_STUDENT_COLLECTION_NAME)
          .doc();

        const data = new ClassStudentModel({ email });

        batch.set(ref, data.toJson());
      });

      await batch.commit();

      return this.success(true);
    } catch (error) {
      // console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getInviteStatus = (classId: string): Promise<WithError<unknown[]>> => {
    throw new Error('Method not implemented.');
  };

  getAllStudentList = async (
    classId: string,
  ): Promise<WithError<ClassStudentModel[]>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const batch = firebase.firestore().batch();

      const { docs } = await firebase
        .firestore()
        .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .collection(TeacherApi.CLASSES_STUDENT_COLLECTION_NAME)
        .get();

      const students = docs.map<ClassStudentModel>(doc => {
        const studentModel = new ClassStudentModel(
          (doc as unknown) as ClassStudentModel,
        );

        studentModel.setStudentId(doc.id);

        return studentModel;
      });

      return this.success(students);
    } catch (error) {
      // console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };
  //#endregion invite

  //#region class_session
  startClassSession = async (
    classId: string,
    macId: string,
    date: Date,
  ): Promise<WithError<string>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const info = new SessionInfoModel({
        classId,
        macId,
        teacherId: userId,
        sessionDate: date,
      });

      // path to the class
      const ref = firebase
        .firestore()
        .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId);

      // add an new session to DB
      const doc = await ref
        .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
        .add(info.toJson());

      // update class info to include the live status and sessionId
      await ref.update(
        TeacherClassModel.Update({
          isLive: true,
          currentSessionId: doc.id,
        }),
      );

      const [students] = await this.getAllStudentList(classId);

      if (students !== null) {
        await Promise.all(
          students.map(async student => {
            await ref
              .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
              .doc(doc.id)
              .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
              .doc(student.studentId ?? student.rollNo)
              .set(
                // TODO: only add those student who has joined the class
                new SessionStudentModel({
                  studentId: student.studentId ?? '',
                }).toJson(),
              );
          }),
        );
      }

      return this.success(doc.id);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  saveClassSession = async (
    classId: string,
    sessionId: string, // there is no need of session id
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      // path to the class
      const ref = firebase
        .firestore()
        .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId);

      // update class info to include the live status and sessionId
      await ref.update(
        TeacherClassModel.Update({
          isLive: false,
          // currentSessionId: doc.id,
        }),
      );

      return this.success(true);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  discardClassSession = async (
    classId: string,
    sessionId: string,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      // delete the session from firestore
      await firebase
        .firestore()
        .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
        .doc(sessionId)
        .delete();

      return this.success(true);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
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

  editStudentAttendanceReport = async (
    classId: string,
    sessionId: string,
    studentId: string,
    status: boolean,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      // delete the session from firestore
      await firebase
        .firestore()
        .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
        .doc(userId)
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
        .doc(sessionId)
        .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
        .doc(studentId)
        .update(
          SessionStudentModel.Update({
            present: status,
          }),
        );

      return this.success(true);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };
  //#endregion attendance_report
}

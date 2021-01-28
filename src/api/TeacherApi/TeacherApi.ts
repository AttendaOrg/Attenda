/* eslint-disable @typescript-eslint/no-unused-vars */
import firebase from 'firebase';
import AuthApi from '../AuthApi';
import { BasicErrors, WithError } from '../BaseApi';
import TeacherClassModel, {
  TeacherClassModelProps,
} from './model/TeacherClassModel';
import SessionInfoModel, {
  SessionInfoInterface,
} from './model/SessionInfoModel';
import SessionStudentModel, {
  SessionStudentInterface,
} from './model/SessionStudentModel';
import InviteStudentModel, {
  IInviteStudentModel,
} from './model/InviteStudentModel';
import { UserRole } from '../index';
import ClassStudentModel, {
  ClassStudentModelInterface,
} from './model/ClassStudentModel';

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
   * update class code by class id
   * @param classId
   * @param newClassCode
   */
  updateClassCode(
    classId: string,
    newClassCode: string,
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

  /**
   * archive the class this makes the data read only
   * @param classId
   */
  archiveClass(classId: string): Promise<WithError<boolean>>;

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
   */
  getInviteStatus(classId: string): Promise<WithError<InviteStudentModel[]>>;

  /**
   * given the classId get All student enrolled in a class
   * @param classId
   */
  getAllStudentList(classId: string): Promise<WithError<ClassStudentModel[]>>;

  /**
   * archive the student profile given a classId
   * @param classId
   * @param studentId
   */
  archiveStudent(
    classId: string,
    studentId: string,
  ): Promise<WithError<boolean>>;
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
   * @param sessionId
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
    month: Date,
  ): Promise<WithError<SessionInfoModel[]>>;

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
  ): Promise<WithError<SessionStudentModel[]>>;

  /**
   * get session report of a specific session
   * @param classId
   * @param sessionId
   */
  getSessionAttendanceReport(
    classId: string,
    sessionId: string,
  ): Promise<WithError<SessionStudentModel[]>>;

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
  static readonly CLASSES_COLLECTION_NAME = 'classes';

  static readonly CLASSES_INVITE_STUDENT_COLLECTION_NAME = 'invite_students';

  static readonly CLASSES_JOINED_STUDENT_COLLECTION_NAME = 'joined_students';

  static readonly CLASSES_SESSIONS_COLLECTION_NAME = 'sessions';

  static readonly CLASSES_SESSIONS_STUDENT_COLLECTION_NAME =
    'sessions_students';

  //#region helper methods
  /**
   * gets the starting date of the month and starting day of the next month
   * @param month
   * @returns [startDayOfTheMonth,nextMonthStartDay]
   * @example
   * const date = new Date(); // Fri Jan 22 2021 22:33:08 GMT+0530 (India Standard Time)
   * const [ startDayOfTheMonth,nextMonthStartDay ] = getMonthRange(date);
   * // [Wed Dec 01 2021 00:00:00 GMT+0530 (India Standard Time), Sat Jan 01 2022 00:00:00 GMT+0530 (India Standard Time)]
   */
  getMonthRange = (month: Date): [Date, Date] => {
    const startingMonthDate = new Date(month);
    const endingMonthDate = new Date(month);

    startingMonthDate.setDate(1);
    endingMonthDate.setDate(1);
    endingMonthDate.setMonth(month.getMonth() + 1);

    return [startingMonthDate, endingMonthDate];
  };
  //#endregion

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
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .update(teacherClass);

      return this.success(true);
    } catch (ex) {
      // console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  updateClassCode = async (
    classId: string,
    newClassCode: string,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      // path to the class
      const ref = firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId);

      // update class info with new class code
      await ref.update(
        TeacherClassModel.Update({
          classCode: newClassCode,
        }),
      );

      return this.success(true);
    } catch (ex) {
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
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .update(updateData);

      return this.success(true);
    } catch (error) {
      // console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  archiveClass = async (classId: string): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      // path to the class
      const ref = firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId);

      await ref.update(
        TeacherClassModel.Update({
          isArchived: true,
        }),
      );

      return this.success(true);
    } catch (error) {
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
          .collection(TeacherApi.CLASSES_COLLECTION_NAME)
          .doc(classId)
          .collection(TeacherApi.CLASSES_INVITE_STUDENT_COLLECTION_NAME)
          .doc();

        const data = new InviteStudentModel({ email });

        batch.set(ref, data.toJson());
      });

      await batch.commit();

      return this.success(true);
    } catch (error) {
      // console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getInviteStatus = async (
    classId: string,
  ): Promise<WithError<InviteStudentModel[]>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const { docs } = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .collection(TeacherApi.CLASSES_INVITE_STUDENT_COLLECTION_NAME)
        .get();

      const students = docs.map<InviteStudentModel>(doc => {
        return new InviteStudentModel(
          (doc.data() as unknown) as IInviteStudentModel,
        );
      });

      return this.success(students);
    } catch (error) {
      // console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getAllStudentList = async (
    classId: string,
  ): Promise<WithError<ClassStudentModel[]>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const { docs } = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .collection(TeacherApi.CLASSES_JOINED_STUDENT_COLLECTION_NAME)
        .get();

      const students = docs.map<ClassStudentModel>(doc => {
        return new ClassStudentModel(
          (doc.data() as unknown) as ClassStudentModelInterface,
        );
      });

      return this.success(students);
    } catch (error) {
      // console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  archiveStudent = async (
    classId: string,
    studentId: string,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const classStudentRef = firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .collection(TeacherApi.CLASSES_JOINED_STUDENT_COLLECTION_NAME)
        .doc(studentId);

      const student = await classStudentRef.get();

      if (!student.exists)
        return this.error(BasicErrors.USER_DOES_NOT_EXIST_IN_CLASS);

      await classStudentRef.update(
        ClassStudentModel.Update({
          archived: true,
        }),
      );

      // QUESTION: do we update the class session student to indicate if it is archived?

      return this.success(true);
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
      const classRef = firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId);

      // add an new session to DB
      const sessionDoc = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
        .add(info.toJson());

      // update class info to include the live status and sessionId
      const sessionId = sessionDoc.id;

      await classRef.update(
        TeacherClassModel.Update({
          isLive: true,
          currentSessionId: sessionId,
        }),
      );

      const [students] = await this.getAllStudentList(classId);

      if (students !== null) {
        // QUESTION: do we need to pre-populate session student table ?
        await Promise.all(
          students.map(student => {
            return firebase
              .firestore()
              .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
              .add(
                // TODO: only add those student who has joined the class
                new SessionStudentModel({
                  studentId: student.studentId ?? '',
                  classId,
                  sessionId: sessionDoc.id,
                }).toJson(),
              );
          }),
        );
      }

      return this.success(sessionDoc.id);
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
  getClassAttendanceReport = async (
    classId: string,
    month: Date,
  ): Promise<WithError<SessionInfoModel[]>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const [startDayOfTheMonth, nextMonthStartDay] = this.getMonthRange(month);

      const result = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
        .where('classId', '==', classId)
        .where('teacherId', '==', userId)
        .where('sessionDate', '>=', startDayOfTheMonth)
        .where('sessionDate', '<', nextMonthStartDay)
        .get();

      const sessionInfos: SessionInfoModel[] = result.docs.map(
        doc => new SessionInfoModel((doc as unknown) as SessionInfoInterface),
      );

      return this.success(sessionInfos);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getAllStudentAttendanceSummery = (
    classId: string,
  ): Promise<WithError<unknown>> => {
    // TODO: implement this method
    throw new Error('Method not implemented.');
  };

  getStudentAttendanceReport = async (
    classId: string,
    studentId: string,
    month: number,
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
        .where('studentId', '==', studentId)
        .where('teacherId', '==', userId)
        .get();

      const sessions: SessionStudentModel[] = currentSessionDocs.docs.map(
        doc =>
          new SessionStudentModel((doc as unknown) as SessionStudentInterface),
      );

      return this.success(sessions);
    } catch (ex) {
      return this.error(BasicErrors.EXCEPTION);
    }
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
      const result = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
        .where('classId', '==', classId)
        .where('sessionId', '==', sessionId)
        .where('studentId', '==', studentId)
        .get();

      // if the student not found in the session throw an error
      // if(result.docs.length ===0) return this.error(BasicErrors.EXCEPTION)
      // TODO: only update single entity
      await Promise.all(
        result.docs.map(user =>
          user.ref.update(
            SessionStudentModel.Update({
              present: status,
              whom: UserRole.TEACHER,
            }),
          ),
        ),
      );

      return this.success(true);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getSessionAttendanceReport = async (
    classId: string,
    sessionId: string,
  ): Promise<WithError<SessionStudentModel[]>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      // path to the session
      const session = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
        .where('classId', '==', classId)
        .where('sessionId', '==', sessionId)
        .get();

      const { docs } = session;

      const students = docs.map(doc => {
        const studentModel = new SessionStudentModel(
          (doc as unknown) as SessionStudentInterface,
        );

        // FIXME:: fix the student id issue
        studentModel.setStudentId(doc.data().studentId);

        return studentModel;
      });

      return this.success(students);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };
  //#endregion attendance_report
}

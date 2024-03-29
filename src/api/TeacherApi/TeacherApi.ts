/* eslint-disable @typescript-eslint/no-unused-vars */
import firebase from 'firebase';
import AuthApi from '../AuthApi';
import {
  BasicErrors,
  RealTimeListenerUnSubscriber,
  WithError,
} from '../BaseApi';
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
import { hashMacId } from '../util/hash';
import { getMonthRange } from '../../util';
import ClassCardIconModel, {
  ClassCardIconProps,
} from './model/ClassCardIconModel';
import { analyticsApi, AnalyticsApiDocs } from '../analytics';

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
   * checks if the invite code is available
   * @param inviteCode
   */
  checkIsValidInviteCode(inviteCode: string): Promise<WithError<boolean>>;

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
   * gets class info given by class id/code
   * @param classId can accept classId or classCode
   */
  getClassInfo(classId: string): Promise<WithError<TeacherClassModel>>;

  /**
   * get all class of the teacher
   * @param page
   */
  getAllClass(page?: string): Promise<WithError<TeacherClassModel[]>>;

  getClassListener: (
    onDataChange: (newData: TeacherClassModel[]) => void,
  ) => () => void;

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
   */
  getClassAttendanceReport(
    classId: string,
    month: Date,
  ): Promise<WithError<SessionInfoModel[]>>;

  /**
   * gets the attendance report if a student by month
   * @param classId
   * @param studentId
   * @param month
   */
  getStudentAttendanceReport(
    classId: string,
    studentId: string,
    month: Date,
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

  static readonly CLASS_CARD_ICONS_COLLECTION_NAME = 'class_card_icons';

  static readonly CLASSES_INVITE_STUDENT_COLLECTION_NAME = 'invite_students';

  static readonly CLASSES_JOINED_STUDENT_COLLECTION_NAME = 'joined_students';

  static readonly CLASSES_SESSIONS_COLLECTION_NAME = 'sessions';

  static readonly CLASSES_SESSIONS_STUDENT_COLLECTION_NAME =
    'sessions_students';

  //#region class
  createClass = async (
    teacherClass: TeacherClassModel,
  ): Promise<WithError<string>> => {
    try {
      const userId = this.getUserUid();
      const displayName = this.getUserDisplayName();

      if (teacherClass.teacherName === null)
        teacherClass.setTeacherName(displayName);

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const doc = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .add(teacherClass.toJson());

      analyticsApi.sendSingle(
        `TeacherApi.createClass - ${AnalyticsApiDocs.CLASS_WRITE}`,
      );

      return this.success(doc.id);
    } catch (ex) {
      // console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  /**
   * @deprecated
   * @param classId
   * @returns
   */
  getClassInfoByIdOrCode = async (
    classId: string,
  ): Promise<WithError<TeacherClassModel>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      // NOTE: because firebase doesn't support logical OR query
      // we have to perform multiple query

      const classIdDocs = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .get();

      const classCodeDocs = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .where('classCode', '==', classId)
        .get();

      const [classIdSnapshot, classCodeSnapshot] = await Promise.all([
        classIdDocs,
        classCodeDocs,
      ]);

      const arr: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>[] = [
        ...classCodeSnapshot.docs,
      ];

      if (classIdSnapshot !== undefined && classIdSnapshot.exists)
        arr.push(classIdSnapshot);

      const match: TeacherClassModel[] = arr
        .map(doc => {
          const data = doc.data();
          const fullData: TeacherClassModelProps = {
            ...((data as unknown) as TeacherClassModelProps),
            classId: doc.id,
          };

          return new TeacherClassModel(fullData);
        })
        .filter(info => info.classId);

      if (match.length === 0) return this.error(BasicErrors.NO_CLASS_FOUND);

      return this.success(match[0]);
    } catch (e) {
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

      const classDoc = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .get();

      analyticsApi.sendSingle(
        `TeacherApi.getClassInfo - ${AnalyticsApiDocs.CLASS_READ}`,
      );

      if (!classDoc.exists) return this.error(BasicErrors.NO_CLASS_FOUND);

      const data = classDoc.data();
      const fullData: TeacherClassModelProps = {
        ...((data as unknown) as TeacherClassModelProps),
        classId: classDoc.id,
      };

      return this.success(new TeacherClassModel(fullData));
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getClassInfoByCode = async (
    classCode: string,
  ): Promise<WithError<TeacherClassModel>> => {
    try {
      const classDocs = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .where('classCode', '==', classCode)
        .get();

      analyticsApi.sendSingle(
        `TeacherApi.getClassInfoByCode - ${AnalyticsApiDocs.CLASS_READ}`,
      );

      if (classDocs.docs.length === 0)
        return this.error(BasicErrors.NO_CLASS_FOUND);

      const [classDoc] = classDocs.docs;

      const data = classDoc.data();
      const fullData: TeacherClassModelProps = {
        ...((data as unknown) as TeacherClassModelProps),
        classId: classDoc.id,
      };

      return this.success(new TeacherClassModel(fullData));
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getClassInfoRealTime = (
    classId: string,
    cb: (classInfo: TeacherClassModel) => void,
  ): RealTimeListenerUnSubscriber => {
    const error = (msg: string | undefined | number = 'un attach'): void =>
      console.error(msg);

    try {
      const userId = this.getUserUid();

      if (userId === null) return error;

      return firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .onSnapshot(snapShot => {
          const data = snapShot.data();
          const fullData: TeacherClassModelProps = {
            ...((data as unknown) as TeacherClassModelProps),
            classId: snapShot.id,
          };

          analyticsApi.sendSingle(
            `TeacherApi.getClassInfoRealTime - ${AnalyticsApiDocs.CLASS_READ}`,
          );

          cb(new TeacherClassModel(fullData));
        });
    } catch (e) {
      return error;
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

      analyticsApi.sendSingle(
        `TeacherApi.updateClass - ${AnalyticsApiDocs.CLASS_UPDATE}`,
      );

      return this.success(true);
    } catch (ex) {
      // console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  checkIsValidInviteCode = async (
    inviteCode: string,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null) return this.error(BasicErrors.EXCEPTION);

      const match = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .where('classCode', '==', inviteCode)
        .get();

      analyticsApi.sendSingle(
        `TeacherApi.checkIsValidInviteCode - ${AnalyticsApiDocs.CLASS_READ}`,
      );

      return this.success(match.docs.length === 0);
    } catch (error) {
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

      analyticsApi.sendSingle(
        `TeacherApi.updateClassCode - ${AnalyticsApiDocs.CLASS_UPDATE}`,
      );

      return this.success(true);
    } catch (ex) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  updateClassIcon = async (
    classId: string,
    classIcon: string,
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
          classIcon,
        }),
      );

      analyticsApi.sendSingle(
        `TeacherApi.updateClassIcon - ${AnalyticsApiDocs.CLASS_UPDATE}`,
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

      analyticsApi.sendSingle(
        `TeacherApi.isClassExist - ${AnalyticsApiDocs.CLASS_READ}`,
      );

      return this.success(doc.exists);
    } catch (error) {
      // console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getClassListener = (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onDataChange = (_newData: TeacherClassModel[]) => {},
  ): (() => void) => {
    const error = () => {
      console.error('error');
    };

    try {
      const userId = this.getUserUid();

      if (userId === null) return error;

      const query = firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .where('teacherId', '==', userId)
        .orderBy('title');

      const unSubscribe = query.onSnapshot(snapshot => {
        // TODO: find way to optimize the query to only include update or inserted or deleted data
        const { docs } = snapshot;
        const newClasses = docs.map(
          classModel =>
            new TeacherClassModel({
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...(classModel.data() as any),
              classId: classModel.id,
            }),
        );

        analyticsApi.sendMultiple(
          `TeacherApi.getClassListener - ${AnalyticsApiDocs.CLASS_READ}`,
          docs.length,
        );
        onDataChange(newClasses);
      });

      return unSubscribe;
    } catch (ex) {
      // console.log(ex);

      return error;
    }
  };

  getAllClass = async (): Promise<WithError<TeacherClassModel[]>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const query = firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .where('teacherId', '==', userId);

      const classes = await query.get();

      const allClass = classes.docs
        .map(
          classModel =>
            new TeacherClassModel({
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...(classModel.data() as any),
              classId: classModel.id,
            }),
        )
        .sort((a, b) => a.title.localeCompare(b.title));

      analyticsApi.sendMultiple(
        `TeacherApi.getAllClass - ${AnalyticsApiDocs.CLASS_READ}`,
        allClass.length,
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

      await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .update(updateData);

      analyticsApi.sendSingle(
        `TeacherApi.changeInviteCodeEnableStatus - ${AnalyticsApiDocs.CLASS_UPDATE}`,
      );

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

      analyticsApi.sendSingle(
        `TeacherApi.archiveClass - ${AnalyticsApiDocs.CLASS_UPDATE}`,
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

      analyticsApi.sendMultiple(
        `TeacherApi.inviteStudent - ${AnalyticsApiDocs.INVITE_EMAIL_WRITE}`,
        emails.length,
      );

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

      analyticsApi.sendMultiple(
        `TeacherApi.getInviteStatus - ${AnalyticsApiDocs.INVITE_EMAIL_READ}`,
        students.length,
      );

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

      analyticsApi.sendMultiple(
        `TeacherApi.getAllStudentList - ${AnalyticsApiDocs.JOINED_STUDENTS_READ}`,
        students.length,
      );

      return this.success(students);
    } catch (error) {
      // console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getStudentInfo = async (
    classId: string,
    studentId: string,
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
        .doc(studentId)
        .get();

      const student = new ClassStudentModel(
        (doc.data() as unknown) as ClassStudentModelInterface,
      );

      analyticsApi.sendSingle(
        `TeacherApi.getStudentInfo - ${AnalyticsApiDocs.JOINED_STUDENTS_READ}`,
      );

      return this.success(student);
    } catch (error) {
      // console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getRealtimeStudentInfo = (
    classId: string,
    studentId: string,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onDataChange = (_newData: ClassStudentModel) => {},
  ): RealTimeListenerUnSubscriber => {
    const error = (msg: string | undefined | number = 'un attach'): void => {
      console.error(msg);
    };

    const userId = this.getUserUid();

    if (userId === null) return error;

    const doc = firebase
      .firestore()
      .collection(TeacherApi.CLASSES_COLLECTION_NAME)
      .doc(classId)
      .collection(TeacherApi.CLASSES_JOINED_STUDENT_COLLECTION_NAME)
      .doc(studentId);

    return doc.onSnapshot(snapshot => {
      const data = (snapshot.data() as unknown) as ClassStudentModelInterface;
      const student = new ClassStudentModel(data);

      onDataChange(student);
      analyticsApi.sendSingle(
        `TeacherApi.getStudentInfo - ${AnalyticsApiDocs.JOINED_STUDENTS_READ}`,
      );
    });

    // console.log(error);

    return error;
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

      analyticsApi.sendSingle(
        `TeacherApi.archiveStudent - ${AnalyticsApiDocs.JOINED_STUDENTS_UPDATE}`,
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

      // we are not sending the mac id to firebase database directly
      // we are sending hashed version of the mac id which is also salted with the classId
      const hashMac = hashMacId(classId, macId);

      const info = new SessionInfoModel({
        classId,
        macId: hashMac,
        teacherId: userId,
        sessionDate: date,
        sessionId: null, // for first it should be null after creation update it
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

      analyticsApi.sendSingle(
        `TeacherApi.startClassSession - ${AnalyticsApiDocs.CLASS_SESSION_WRITE}`,
      );

      // update class info to include the live status and sessionId
      const sessionId = sessionDoc.id;

      await classRef.update(
        TeacherClassModel.Update({
          isLive: true,
          currentSessionId: sessionId,
        }),
      );

      analyticsApi.sendSingle(
        `TeacherApi.startClassSession - ${AnalyticsApiDocs.CLASS_SESSION_UPDATE}`,
      );

      await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
        .doc(sessionId)
        .update(
          SessionInfoModel.UpdateData({
            sessionId,
          }),
        );
      analyticsApi.sendSingle(
        `TeacherApi.startClassSession - ${AnalyticsApiDocs.CLASS_SESSION_UPDATE}`,
      );

      const batch = firebase.firestore().batch();
      const [students] = await this.getAllStudentList(classId);

      students?.forEach(student => {
        const ref = firebase
          .firestore()
          .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
          .doc();

        const data = new SessionStudentModel({
          classId,
          sessionId,
          studentId: student.studentId ?? '',
          studentName: student.studentName,
          whom: UserRole.TEACHER,
          present: false,
          profilePicUrl: student.profilePicUrl,
        }).toJson();

        batch.set(ref, data);
      });

      await batch.commit();

      analyticsApi.sendMultiple(
        `TeacherApi.startClassSession - ${AnalyticsApiDocs.CLASS_SESSION_STUDENTS_WRITE}`,
        students?.length ?? 0,
      );
      // if (students !== null)
      // QUESTION: do we need to pre-populate session student table ?
      // apparently the answer is no

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
      const refToClass = firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId);

      // update class info to include the live status and sessionId
      await refToClass.update(
        TeacherClassModel.Update({
          isLive: false,
          currentSessionId: null,
        }),
      );

      analyticsApi.sendSingle(
        `TeacherApi.saveClassSession - ${AnalyticsApiDocs.CLASS_UPDATE}`,
      );

      // path to current session
      const refToCurrentSession = firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
        .doc(sessionId);

      // update class info to include the live status and sessionId
      await refToCurrentSession.update(
        SessionInfoModel.UpdateData({
          isLive: false,
        }),
      );
      analyticsApi.sendSingle(
        `TeacherApi.saveClassSession - ${AnalyticsApiDocs.CLASS_SESSION_UPDATE}`,
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

      // path to the class
      const ref = firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId);

      // update class info to include the live status and sessionId
      await ref.update(
        TeacherClassModel.Update({
          isLive: false,
          currentSessionId: null,
        }),
      );

      analyticsApi.sendSingle(
        `TeacherApi.discardClassSession - ${AnalyticsApiDocs.CLASS_UPDATE}`,
      );

      // delete the session from firestore
      await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
        .doc(sessionId)
        .delete();

      analyticsApi.sendSingle(
        `TeacherApi.discardClassSession - ${AnalyticsApiDocs.CLASS_SESSION_DELETE}`,
      );

      // delete the session students
      const match = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
        .where('classId', '==', classId)
        .where('sessionId', '==', sessionId)
        .get();
      const { docs } = match;

      await Promise.all(
        docs.map(async d => {
          console.log(d.id);

          await d.ref.delete();

          return d;
        }),
      );
      analyticsApi.sendSingle(
        `TeacherApi.discardClassSession - ${AnalyticsApiDocs.CLASS_SESSION_STUDENTS_DELETE}`,
      );

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

      const [startDayOfTheMonth, nextMonthStartDay] = getMonthRange(month);

      const result = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
        .where('classId', '==', classId)
        .where('teacherId', '==', userId)
        .where('sessionDate', '>=', startDayOfTheMonth)
        .where('sessionDate', '<', nextMonthStartDay)
        .orderBy('sessionDate', 'desc')
        .get();

      console.log(result.docs);

      const sessionInfos: SessionInfoModel[] = result.docs.map(doc => {
        const data: firebase.firestore.DocumentData = doc.data();
        const info: SessionInfoInterface = {
          classId: data.classId,
          macId: data.macId,
          teacherId: data.teacherId,
          isLive: data.isLive,
          lastUpdateTime: data.lastUpdateTime.toDate(),
          sessionDate: data.sessionDate.toDate(),
          sessionId: data.sessionId,
        };

        return new SessionInfoModel(info);
      });

      analyticsApi.sendMultiple(
        `TeacherApi.getClassAttendanceReport - ${AnalyticsApiDocs.CLASS_SESSION_READ}`,
        sessionInfos.length,
      );

      return this.success(sessionInfos);
    } catch (e) {
      console.log(e);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getLiveStudentAttendance = (
    classId: string,
    sessionId: string,
    listOfJoinedStudent: ClassStudentModel[],
    cb: (sessions: SessionStudentModel[]) => void,
  ): (() => void) => {
    const error = () => console.log('error');

    try {
      const userId = this.getUserUid();

      if (userId === null) return error;

      const query = firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
        .where('sessionId', '==', sessionId);

      // get session list
      const unSubscribe = query.onSnapshot(snapshot => {
        const { docs } = snapshot;

        const sessions: SessionStudentModel[] = docs.map(
          doc =>
            new SessionStudentModel(
              (doc.data() as unknown) as SessionStudentInterface,
            ),
        );

        analyticsApi.sendMultiple(
          `TeacherApi.getLiveStudentAttendance - ${AnalyticsApiDocs.CLASS_SESSION_STUDENTS_READ}`,
          sessions.length,
        );

        const sessionStudentIds = sessions.map(e => e.studentId);

        const allStudentAttendance = listOfJoinedStudent.map(student => {
          const studentId = student.studentId ?? '';
          const studentName = student.studentName ?? '';

          // if there is already student given present document return it
          if (sessionStudentIds.includes(studentId))
            return sessions.filter(s => s.studentId === studentId)[0];

          // or return a dummy session student
          return new SessionStudentModel({
            classId,
            sessionId,
            studentId,
            studentName,
            present: false,
            profilePicUrl: student.profilePicUrl,
          });
        });

        cb(allStudentAttendance);
      });
      // const sessions: SessionStudentModel[] = currentSessionDocs.docs.map(
      //   doc =>
      //     new SessionStudentModel((doc as unknown) as SessionStudentInterface),
      // );

      return unSubscribe;
    } catch (ex) {
      return error;
    }
  };

  getStudentAttendanceReport = async (
    classId: string,
    studentId: string,
    month: Date,
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
        .orderBy('sessionTime', 'desc')
        .get();

      const sessions: SessionStudentModel[] = currentSessionDocs.docs.map(
        doc => {
          const data: firebase.firestore.DocumentData = doc.data();
          const info: SessionStudentInterface = {
            classId: data.classId,
            whom: data.whom,
            present: data.present,
            studentId: data.studentId,
            sessionId: data.sessionId,
            sessionTime: data.sessionTime.toDate(),
            lastUpdateTime: data.lastUpdateTime.toDate(),
            studentName: data.studentName,
          };

          return new SessionStudentModel(info);
        },
      );

      analyticsApi.sendMultiple(
        `TeacherApi.getStudentAttendanceReport - ${AnalyticsApiDocs.CLASS_SESSION_STUDENTS_READ}`,
        sessions.length,
      );

      return this.success(sessions);
    } catch (ex) {
      console.log(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getStudentName = async (
    classId: string,
    studentId: string,
  ): Promise<string> => {
    const student = await firebase
      .firestore()
      .collection(TeacherApi.CLASSES_COLLECTION_NAME)
      .doc(classId)
      .collection(TeacherApi.CLASSES_JOINED_STUDENT_COLLECTION_NAME)
      .doc(studentId)
      .get();

    const data = (student.data() as unknown) as ClassStudentModelInterface;

    analyticsApi.sendSingle(
      `TeacherApi.getStudentName - ${AnalyticsApiDocs.JOINED_STUDENTS_READ}`,
    );

    return data.studentName ?? '';
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

      analyticsApi.sendSingle(
        `TeacherApi.editStudentAttendanceReport - ${AnalyticsApiDocs.CLASS_SESSION_STUDENTS_READ}`,
      );

      if (result.docs.length === 0) {
        const [studentInfo] = await this.getStudentInfo(classId, studentId);

        // if there is no entry add an entry
        await firebase
          .firestore()
          .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
          .add(
            new SessionStudentModel({
              classId,
              sessionId,
              studentId,
              studentName: studentInfo?.studentName ?? '',
              whom: UserRole.TEACHER,
              present: true,
              profilePicUrl: studentInfo?.profilePicUrl,
            }).toJson(),
          );

        analyticsApi.sendSingle(
          `TeacherApi.editStudentAttendanceReport - ${AnalyticsApiDocs.CLASS_SESSION_STUDENTS_WRITE}`,
        );
      } else {
        // NOTE: this should be only one update who knows ?
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
        analyticsApi.sendMultiple(
          `TeacherApi.editStudentAttendanceReport - ${AnalyticsApiDocs.CLASS_SESSION_STUDENTS_UPDATE}`,
          result.docs.length,
        );
      }

      return this.success(true);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  /**
   * @deprecated this method is deprecated @see getLiveStudentAttendance
   */
  getSessionAttendanceReport = async (
    classId: string,
    sessionId: string,
  ): Promise<WithError<SessionStudentModel[]>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      // path to the session
      const presentGivenStudentData = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
        .where('classId', '==', classId)
        .where('sessionId', '==', sessionId)
        .get();

      const { docs } = presentGivenStudentData;

      const presentGivenStudent = docs.map(doc => {
        const data: firebase.firestore.DocumentData = doc.data();

        const info: SessionStudentInterface = {
          classId: data.classId,
          sessionId: data.sessionId,
          studentId: data.studentId,
          present: data.present,
          lastUpdateTime: data.lastUpdateTime.toDate(),
          sessionTime: data.sessionTime.toDate(),
          whom: data.whom,
          studentName: data.studentName,
        };

        return new SessionStudentModel(info);
      });

      const presentGivenStudentIds = presentGivenStudent.map(
        student => student.studentId,
      );

      const [allStudents] = await this.getAllStudentList(classId);

      if (allStudents?.length === presentGivenStudent.length) {
        console.log(presentGivenStudent);

        return this.success(presentGivenStudent);
      }

      const totalSessionStudent =
        allStudents
          ?.map(student => {
            const studentId = student.studentId ?? '';
            const studentName = student.studentName ?? '';

            if (presentGivenStudentIds.includes(studentId))
              return presentGivenStudent.filter(
                s => s.studentId === studentId,
              )[0];

            return new SessionStudentModel({
              classId,
              sessionId,
              studentId,
              studentName,
              present: false,
            });
          })
          .filter(e => {
            if (e === undefined) {
              console.log('undefined ?');

              return false;
            }

            return true;
          }) ?? [];

      console.log(totalSessionStudent);

      return this.success(totalSessionStudent);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  changeStudentRollNo = async (
    classId: string,
    studentId: string,
    newRollNo: string,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const student = await firebase
        .firestore()
        .collection(TeacherApi.CLASSES_COLLECTION_NAME)
        .doc(classId)
        .collection(TeacherApi.CLASSES_JOINED_STUDENT_COLLECTION_NAME)
        .doc(studentId)
        .get();

      analyticsApi.sendSingle(
        `TeacherApi.changeStudentRollNo - ${AnalyticsApiDocs.JOINED_STUDENTS_READ}`,
      );

      if (!student.exists)
        return this.error(BasicErrors.USER_DOES_NOT_EXIST_IN_CLASS);

      student.ref.update(
        ClassStudentModel.Update({
          rollNo: newRollNo,
        }),
      );

      analyticsApi.sendSingle(
        `TeacherApi.changeStudentRollNo - ${AnalyticsApiDocs.JOINED_STUDENTS_UPDATE}`,
      );

      return this.success(true);
    } catch (error) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };
  //#endregion attendance_report

  createClassCardIcons = async (
    name: string,
    iconData: string,
    category: string,
  ): Promise<WithError<boolean>> => {
    try {
      const icon = new ClassCardIconModel({
        name,
        iconData,
        category,
      });

      await firebase
        .firestore()
        .collection(TeacherApi.CLASS_CARD_ICONS_COLLECTION_NAME)
        .add(icon.toJson());

      // NOTE: no need to count it

      return this.success(true);
    } catch (error) {
      console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getAllClassCardIcons = async (): Promise<WithError<ClassCardIconModel[]>> => {
    try {
      const { docs } = await await firebase
        .firestore()
        .collection(TeacherApi.CLASS_CARD_ICONS_COLLECTION_NAME)
        .get();

      analyticsApi.sendMultiple(
        `TeacherApi.getAllClassCardIcons - ${AnalyticsApiDocs.CLASS_CARD_ICON_READ}`,
        docs.length,
      );

      return this.success(
        docs.map(
          d =>
            new ClassCardIconModel((d.data() as unknown) as ClassCardIconProps),
        ),
      );
    } catch (error) {
      console.log(error);

      return this.error(BasicErrors.EXCEPTION);
    }
  };
}

export const teacherApi = new TeacherApi();

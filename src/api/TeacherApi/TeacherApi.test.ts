import * as admin from 'firebase-admin';
import {
  deleteAllFirestoreCollection,
  deleteAllUser,
  initAdminSdkForTest,
} from '../util';
import AuthApi from '../AuthApi';
import {
  TEST_CLASS_CODE,
  TEST_TEACHER_EMAIL,
  TEST_PASSWORD,
} from '../util/constant';
import { UserRole } from '../index';
import TeacherClassModel from './model/TeacherClassModel';
import TeacherApi from './TeacherApi';
import BaseApi from '../BaseApi';
import AccountInfo from '../model/AccountInfo';
import SessionStudentModel, {
  SessionStudentInterface,
} from './model/SessionStudentModel';

initAdminSdkForTest();
const authApi = new AuthApi(BaseApi.testOptions);
const teacherApi = new TeacherApi();
let globalClassId = '';

afterAll(async () => {
  //#region delete all existing user
  const newUsers = await deleteAllUser();

  expect(newUsers).toBe(0);
  //#endregion
  //#region delete all firestore collection
  const newCollections = await deleteAllFirestoreCollection();

  expect(newCollections).toBe(0);
  //#endregion
});

beforeAll(async () => {
  // before all the tests create a teacher account
  //#region create an account
  await authApi.signUpWithEmailAndPassword(TEST_TEACHER_EMAIL, TEST_PASSWORD);
  await authApi.loginWithEmailAndPassword(TEST_TEACHER_EMAIL, TEST_PASSWORD);
  const isLoggedIn = await authApi.isLoggedIn();

  expect(isLoggedIn).toBe(true);
  //#endregion

  //#region set account type to a teacher
  const accountInfo = new AccountInfo({
    name: 'Prasanta Barman',
    role: UserRole.TEACHER,
  });

  await authApi.createAccountInfo(accountInfo);
  const [role] = await authApi.getUserRole();

  expect(role).toBe(UserRole.TEACHER);
  //#endregion
});

test('able to create a class', async () => {
  const class1 = new TeacherClassModel({
    section: 'Section',
    title: 'Title',
    classCode: TEST_CLASS_CODE,
    teacherId: teacherApi.getUserUid(),
  });

  const [classId] = await teacherApi.createClass(class1);

  // TODO: find a better way to check create class success
  expect(classId?.length).toBeGreaterThanOrEqual(4);
  if (classId !== null) globalClassId = classId;
});

test('able to get class info', async () => {
  const class1 = new TeacherClassModel({
    section: 'Section',
    title: 'Title',
    teacherId: teacherApi.getUserUid(),
  });

  const [classId] = await teacherApi.createClass(class1);

  const [classModel] = await teacherApi.getClassInfo(classId as string);

  expect(classModel).toBeInstanceOf(TeacherClassModel);
});

test('able to update class info', async () => {
  const class1 = new TeacherClassModel({
    section: 'Section',
    title: 'Title',
    teacherId: teacherApi.getUserUid(),
  });

  const [classId] = await teacherApi.createClass(class1);

  const updatedClass = TeacherClassModel.Update({
    section: 'Section Updated',
    title: 'Title Updated',
    description: 'Description Updated',
    classCode: 'TEST_CLASS_CODE',
  });

  const [success] = await teacherApi.updateClass(
    classId as string,
    updatedClass,
  );

  expect(success).toBe(true);

  const [classModel] = await teacherApi.getClassInfo(classId as string);

  expect(classModel).toBeInstanceOf(TeacherClassModel);
  expect(classModel?.title).toBe(updatedClass.title);
  expect(classModel?.section).toBe(updatedClass.section);
  expect(classModel?.description).toBe(updatedClass.description);
  expect(classModel?.classCode).toBe('TEST_CLASS_CODE');
});

test('able to update class code', async () => {
  const class1 = new TeacherClassModel({
    section: 'Section',
    title: 'Title',
    teacherId: teacherApi.getUserUid(),
  });

  const [classId] = await teacherApi.createClass(class1);

  const [success1] = await teacherApi.updateClassCode(
    classId as string,
    'new_code' as string,
  );

  expect(success1).toBe(true);
  const [classModel1] = await teacherApi.getClassInfo(classId as string);

  expect(classModel1).toBeInstanceOf(TeacherClassModel);
  expect(classModel1?.classCode).toBe('new_code');

  const [success2] = await teacherApi.updateClassCode(
    classId as string,
    '' as string,
  );

  expect(success2).toBe(true);
  const [classModel2] = await teacherApi.getClassInfo(classId as string);

  expect(classModel2?.classCode).toBe('');
});

test('is class exist works', async () => {
  const [resultFailed] = await teacherApi.isClassExist('not exist class id');

  expect(resultFailed).toBe(false);

  const [resultSuccess] = await teacherApi.isClassExist(globalClassId);

  expect(resultSuccess).toBe(true);
});

test('get all class works', async () => {
  const [result] = await teacherApi.getAllClass();

  expect(result).toBeInstanceOf(Array);

  expect(result?.length).toBeGreaterThan(0);
});

test('changing invite code status works', async () => {
  //#region by default it should be true
  const [oldResult] = await teacherApi.getClassInfo(globalClassId);

  expect(oldResult?.isActiveInvite).toBe(true);
  //#endregion

  //#region change status to be true
  await teacherApi.changeInviteCodeEnableStatus(globalClassId, false);

  const [newResult] = await teacherApi.getClassInfo(globalClassId);

  expect(newResult?.isActiveInvite).toBe(false);
  //#endregion

  //#region change status to be false
  await teacherApi.changeInviteCodeEnableStatus(globalClassId, true);

  const [newResult2] = await teacherApi.getClassInfo(globalClassId);

  expect(newResult2?.isActiveInvite).toBe(true);
  //#endregion
});

test('able to archive class', async () => {
  const class1 = new TeacherClassModel({
    section: 'Section',
    title: 'Title',
    teacherId: teacherApi.getUserUid(),
  });

  const [classId] = await teacherApi.createClass(class1);

  //#region check archive class to be false
  const [classModel1] = await teacherApi.getClassInfo(classId as string);

  expect(classModel1).toBeInstanceOf(TeacherClassModel);
  expect(classModel1?.isArchived).toBe(false);
  //#endregion

  //#region check archive class to be false
  const [success] = await teacherApi.archiveClass(classId as string);

  expect(success).toBe(true);

  const [classModel2] = await teacherApi.getClassInfo(classId as string);

  expect(classModel2).toBeInstanceOf(TeacherClassModel);
  expect(classModel2?.isArchived).toBe(true);
  //#endregion
});

test('if the email add & getting student list works', async () => {
  const emails = [TEST_TEACHER_EMAIL, 'test1@google.com'];

  await teacherApi.inviteStudent(globalClassId, emails);

  const [students] = await teacherApi.getAllStudentList(globalClassId);

  expect(students?.length).toBe(emails.length);
});

test('able to start a session', async () => {
  //#region check if the class metadata updated when starting a class
  const [sessionId] = await teacherApi.startClassSession(
    globalClassId,
    '00:00:00:00:02',
    new Date(),
  );
  const [classInfo] = await teacherApi.getClassInfo(globalClassId);

  expect(classInfo?.currentSessionId).toBe(sessionId);
  expect(classInfo?.isLive).toBe(true);
  //#endregion

  //#region check if the session is created
  const session = await admin
    .firestore()
    .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
    .doc(sessionId ?? '')
    .get();

  expect(session.exists).toBe(true);
  //#endregion

  //#region check if for all student there is a session student
  const classStudents = await teacherApi.getAllStudentList(globalClassId);
  const students = await admin
    .firestore()
    .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
    .where('classId', '==', globalClassId)
    .where('sessionId', '==', sessionId)
    .get();

  expect(classStudents.length).toBe(students.docs.length);
  //#endregion
});

test('able to discard a session', async () => {
  //#region check if the class metadata updated when starting a class
  const [sessionId] = await teacherApi.startClassSession(
    globalClassId,
    '00:00:00:00:02',
    new Date(),
  );
  const [classInfo] = await teacherApi.getClassInfo(globalClassId);

  expect(classInfo?.currentSessionId).toBe(sessionId);
  expect(classInfo?.isLive).toBe(true);
  //#endregion

  //#region check if the session is exist in db
  const session1 = await admin
    .firestore()
    .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
    .doc(sessionId ?? '')
    .get();

  expect(session1.exists).toBe(true);
  //#endregion

  await teacherApi.discardClassSession(globalClassId, sessionId ?? '');

  //#region check if the session is discarded
  const session = await admin
    .firestore()
    .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
    .doc(sessionId ?? '')
    .get();

  expect(session.exists).toBe(false);
  //#endregion
});

test('able to save a session', async () => {
  //#region check if the class metadata updated when starting a class
  const [id] = await teacherApi.startClassSession(
    globalClassId,
    '00:00:00:00:02',
    new Date(),
  );
  const [classInfo] = await teacherApi.getClassInfo(globalClassId);

  expect(classInfo?.currentSessionId).toBe(id);
  expect(classInfo?.isLive).toBe(true);
  //#endregion

  //#region check if the session is saved
  await teacherApi.saveClassSession(globalClassId, id ?? '');

  const [updatedClassInfo] = await teacherApi.getClassInfo(globalClassId);

  expect(updatedClassInfo?.isLive).toBe(false);
  //#endregion
});

test('edit student attendance report', async () => {
  const [sessionId] = await teacherApi.startClassSession(
    globalClassId,
    '00:00:00:00:02',
    new Date(),
  );

  if (sessionId !== null) {
    await teacherApi.saveClassSession(globalClassId, sessionId);

    // fetch all student in a session
    const [attendedStudents] = await teacherApi.getSessionAttendanceReport(
      globalClassId,
      sessionId,
    );
    // get the first one for testing
    const student = attendedStudents?.[0];

    // by default the student present will be false and whole will be student
    expect(student?.present).toBe(false);
    expect(student?.whom).toBe(UserRole.STUDENT);

    // edit the attendance
    await teacherApi.editStudentAttendanceReport(
      globalClassId,
      sessionId,
      student?.studentId ?? '',
      true,
    );

    const doc = await admin
      .firestore()
      .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
      .where('classId', '==', globalClassId)
      .where('sessionId', '==', sessionId)
      .where('studentId', '==', student?.studentId ?? '')
      .get();
    const student2 = new SessionStudentModel(
      (doc.docs[0].data() as unknown) as SessionStudentInterface,
    );

    expect(student2?.present).toBe(true);
    expect(student2?.whom).toBe(UserRole.TEACHER);
  }
});

test('getClassAttendanceReport', async () => {
  // because of the previous test the session infos for this month should be
  // getter than 0
  const thisMonth = new Date();
  const [sessionInfos] = await teacherApi.getClassAttendanceReport(
    globalClassId,
    thisMonth,
  );

  expect(sessionInfos?.length).toBeGreaterThan(0);

  // because of the previous test the session infos for next month should be 0
  thisMonth.setMonth(thisMonth.getMonth() + 1);
  const [nextSessionInfos] = await teacherApi.getClassAttendanceReport(
    globalClassId,
    thisMonth,
  );

  expect(nextSessionInfos?.length).toBe(0);
});

test('getStudentAttendanceReport', async () => {
  // TODO:: implement this test
  // for this method to work you have to login as the student and give a present
});

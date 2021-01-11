import * as admin from 'firebase-admin';
import {
  deleteAllFirestoreCollection,
  deleteAllUser,
  initAdminSdkForTest,
} from '../util';
import AuthApi from '../AuthApi';
import { TEST_EMAIL, TEST_PASSWORD } from '../util/constant';
import { UserRole } from '../index';
import TeacherClassModel from './model/TeacherClassModel';
import TeacherApi from './TeacherApi';
import BaseApi from '../BaseApi';
import AccountInfo from '../model/AccountInfo';

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
  await authApi.signUpWithEmailAndPassword(TEST_EMAIL, TEST_PASSWORD);
  await authApi.loginWithEmailAndPassword(TEST_EMAIL, TEST_PASSWORD);
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
  const class1 = new TeacherClassModel({ section: 'Section', title: 'Title' });

  const [classId] = await teacherApi.createClass(class1);

  // TODO: find a better way to check create class success
  expect(classId?.length).toBeGreaterThanOrEqual(4);
  if (classId !== null) globalClassId = classId;
});

test('able to get class info', async () => {
  const class1 = new TeacherClassModel({ section: 'Section', title: 'Title' });

  const [classId] = await teacherApi.createClass(class1);

  const [classModel] = await teacherApi.getClassInfo(classId as string);

  expect(classModel).toBeInstanceOf(TeacherClassModel);
});

test('able to update class info', async () => {
  const class1 = new TeacherClassModel({ section: 'Section', title: 'Title' });

  const [classId] = await teacherApi.createClass(class1);

  const updatedClass = TeacherClassModel.Update({
    section: 'Section Updated',
    title: 'Title Updated',
    description: 'Description Updated',
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

test('if the email add & getting student list works', async () => {
  const emails = [TEST_EMAIL, 'test1@google.com'];

  await teacherApi.inviteStudent(globalClassId, emails);

  const [students] = await teacherApi.getAllStudentList(globalClassId);

  expect(students?.length).toBe(emails.length);
});

test('able to start a session', async () => {
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

  //#region check if the session is created
  const userId = teacherApi.getUserUid() ?? '';
  const session = await admin
    .firestore()
    .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
    .doc(userId)
    .collection(TeacherApi.CLASSES_COLLECTION_NAME)
    .doc(globalClassId)
    .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
    .doc(id ?? '')
    .get();

  expect(session.exists).toBe(true);
  //#endregion

  //#region check if for all student there is a session student
  const classStudents = await teacherApi.getAllStudentList(globalClassId);
  const students = await admin
    .firestore()
    .collection(TeacherApi.TEACHER_ROOT_COLLECTION_NAME)
    .doc(userId)
    .collection(TeacherApi.CLASSES_COLLECTION_NAME)
    .doc(globalClassId)
    .collection(TeacherApi.CLASSES_SESSIONS_COLLECTION_NAME)
    .doc(id ?? '')
    .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
    .get();

  expect(classStudents.length).toBe(students.docs.length);
  //#endregion
});

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
  TEST_STUDENT_EMAIL,
} from '../util/constant';
import { UserRole } from '../index';
import BaseApi from '../BaseApi';
import AccountInfo from '../model/AccountInfo';
import StudentApi from './StudentApi';
import TeacherClassModel from '../TeacherApi/model/TeacherClassModel';
import TeacherApi from '../TeacherApi';
import SessionStudentModel, {
  SessionStudentInterface,
} from '../TeacherApi/model/SessionStudentModel';

initAdminSdkForTest();
const authApi = new AuthApi(BaseApi.testOptions);
const studentApi = new StudentApi();
const teacherApi = new TeacherApi();

let globalClassId = '';
let globalSessionId = '';
const globalClassCode = `${TEST_CLASS_CODE}-${Math.floor(
  Math.random() * 1000,
)}`;

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
  //#region create a teacher account
  await authApi.signUpWithEmailAndPassword(TEST_TEACHER_EMAIL, TEST_PASSWORD);
  await authApi.loginWithEmailAndPassword(TEST_TEACHER_EMAIL, TEST_PASSWORD);

  const teacherAccountInfo = new AccountInfo({
    name: 'Prasanta Barman',
    role: UserRole.TEACHER,
  });

  await authApi.createAccountInfo(teacherAccountInfo);

  const class1 = new TeacherClassModel({
    section: 'Section',
    title: 'Title',
    classCode: globalClassCode,
    teacherId: authApi.getUserUid(),
  });
  const [classId] = await teacherApi.createClass(class1);
  const [sessionId] = await teacherApi.startClassSession(
    classId ?? '',
    '00:00:00:00:02',
    new Date(),
  );

  globalClassId = classId ?? '';
  globalSessionId = sessionId ?? '';

  await authApi.logOut();
  //#endregion
  //#region create a student account
  await authApi.signUpWithEmailAndPassword(TEST_STUDENT_EMAIL, TEST_PASSWORD);
  await authApi.loginWithEmailAndPassword(TEST_STUDENT_EMAIL, TEST_PASSWORD);
  const isLoggedIn = await authApi.isLoggedIn();

  expect(isLoggedIn).toBe(true);
  //#endregion

  //#region set account type to a teacher
  const accountInfo = new AccountInfo({
    name: 'Prasanta Barman',
    role: UserRole.STUDENT,
  });

  await authApi.createAccountInfo(accountInfo);
  await authApi.setUserRole(UserRole.STUDENT);
  const [role] = await authApi.getUserRole();

  expect(role).toBe(UserRole.STUDENT);
  //#endregion
});

test('validateClassJoin', async () => {
  const [failed] = await studentApi.validateClassJoin(
    'class id not exist',
    'Asd',
  );

  expect(failed).toBe(false);

  const [success] = await studentApi.validateClassJoin(globalClassCode, 'Asd');

  expect(success).toBe(true);
});

test('join class', async () => {
  const [prevIds] = await studentApi.getAllJoinedClassId();

  expect(prevIds?.length).toBe(0);

  await studentApi.joinClass(globalClassCode, 'asd');

  const [nextIds] = await studentApi.getAllJoinedClassId();

  expect(nextIds?.length).toBe(1);
});

test('getAllEnrolledClassList', async () => {
  const [list] = await studentApi.getEnrolledClassList(10);

  // because of the prev test enrolled class list should be 1
  expect(list?.length).toBe(1);
  expect(list?.[0]).toBeInstanceOf(TeacherClassModel);
});

test('give presence', async () => {
  const query = admin
    .firestore()
    .collection(TeacherApi.CLASSES_SESSIONS_STUDENT_COLLECTION_NAME)
    .where('studentId', '==', studentApi.getUserUid())
    .where('classId', '==', globalClassId)
    .where('sessionId', '==', globalSessionId);
  // before giving the present there should be no student in session_student
  const beforeSessionStudentData = await query.get();

  expect(beforeSessionStudentData.empty).toBe(true);

  await studentApi.giveResponse(
    globalClassId,
    globalSessionId,
    '00:00:00:00:02',
  );

  // after giving the present there should be student entry in `session_student`
  const afterSessionStudentData = await query.get();
  const sessionStudent = new SessionStudentModel(
    (afterSessionStudentData.docs[0].data() as unknown) as SessionStudentInterface,
  );

  expect(afterSessionStudentData.empty).toBe(false);
  expect(sessionStudent.whom).toBe(UserRole.STUDENT);
  expect(sessionStudent.present).toBe(true);
});

test('get attendance report', async () => {
  // because of the previous test the session should be 1
  const [sessions] = await studentApi.getAttendanceReport(globalClassId);

  expect(sessions?.length).toBe(1);
});

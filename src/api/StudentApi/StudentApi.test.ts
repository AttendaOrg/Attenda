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

initAdminSdkForTest();
const authApi = new AuthApi(BaseApi.testOptions);
const studentApi = new StudentApi();
const teacherApi = new TeacherApi();

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
    classCode: TEST_CLASS_CODE,
  });

  await teacherApi.createClass(class1);
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

  const [success] = await studentApi.validateClassJoin(TEST_CLASS_CODE, 'Asd');

  expect(success).toBe(true);
});

test('join class', async () => {
  const [prevIds] = await studentApi.getAllJoinedClassId();

  expect(prevIds?.length).toBe(0);

  await studentApi.joinClass(TEST_CLASS_CODE, 'asd');

  const [nextIds] = await studentApi.getAllJoinedClassId();

  expect(nextIds?.length).toBe(1);
});

test('getAllEnrolledClassList', async () => {
  const [list] = await studentApi.getEnrolledClassList(10);

  // because of the prev test enrolled class list should be 1
  expect(list?.length).toBe(1);
  expect(list?.[0]).toBeInstanceOf(TeacherClassModel);
});

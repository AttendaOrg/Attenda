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

afterAll(async () => {
  //#region delete all existing user
  const newUsers = await deleteAllUser();

  expect(newUsers).toBe(0);
  //#endregion
  //#region delete all firestore collection
  const newCollections = await deleteAllFirestoreCollection();

  expect(newCollections).toBe(0);

  // user needs to logout or jest will not able to finish test.
  // i think it's happening because firebase keeps an active connection to the
  // sever and doesn't close the connection.
  // so we have to manually close the connection by logging out.
  await authApi.logOut();
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
});

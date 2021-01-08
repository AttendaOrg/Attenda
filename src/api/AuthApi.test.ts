/* eslint-disable import/first */
import firebase from 'firebase';

process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
import * as admin from 'firebase-admin';
import AuthApi from './AuthApi';
import { UserType } from '.';
import BaseApi, { BasicErrors } from './BaseApi';

admin.initializeApp({
  projectId: 'attenda-6c9ad',
});

const TEST_EMAIL = 'test@google.com';
const TEST_PASSWORD = '123456';

const authApi = new AuthApi(BaseApi.testOptions);

afterAll(async () => {
  //#region delete all existing user
  const { users } = await admin.auth().listUsers();

  users.forEach(user => {
    admin.auth().deleteUser(user.uid);
  });
  const { users: newUsers } = await admin.auth().listUsers();

  expect(newUsers.length).toBe(0);
  //#endregion

  //#region delete all firestore collection
  const db = admin.firestore();
  const collections = await db.listCollections();

  await Promise.all(
    collections.map(async coll => {
      // Get a new write batch
      const batch = admin.firestore().batch();
      const documents = await coll.listDocuments();

      documents.forEach(doc => {
        batch.delete(doc);
      });
      await batch.commit();
    }),
  );

  const newCollections = await db.listCollections();

  expect(newCollections.length).toBe(0);
  //#endregion
});

afterEach(async () => {
  await firebase.auth().signOut();
});

test('creation of an account', async () => {
  //#region in starting there shouldn't be any user
  const { users } = await admin.auth().listUsers();

  expect(users.length).toBe(0);
  //#endregion

  //#region successful account creation
  try {
    const [success, error] = await authApi.signUpWithEmailAndPassword(
      TEST_EMAIL,
      TEST_PASSWORD,
    );

    expect(success).toBe(true);
    expect(error).toBe(null);
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
  }
  //#endregion

  //#region email already exist error check
  try {
    // account with same email address is already created
    // it should return correct error code
    const [success, error] = await authApi.signUpWithEmailAndPassword(
      TEST_EMAIL,
      TEST_PASSWORD,
    );

    expect(success).toBe(null);
    expect(error).toBe(BasicErrors.AUTH_EMAIL_ALREADY_IN_USE);
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
  }
  //#endregion

  //#region in the end there should be 1 user
  const { users: newUsers } = await admin.auth().listUsers();

  expect(newUsers.length).toBe(1);
  //#endregion
});

test('check if login, logout works', async () => {
  //#region initially isLoggedIn should return false
  let isLoggedIn: boolean;

  isLoggedIn = await authApi.isLoggedIn();
  expect(isLoggedIn).toBe(false);
  //#endregion

  //#region test with wrong email
  const [, wrongEmail] = await authApi.loginWithEmailAndPassword(
    'wrong@email.com',
    TEST_PASSWORD,
  );

  expect(wrongEmail).toBe(BasicErrors.AUTH_USER_NOT_FOUND);
  //#endregion

  //#region test with wrong password
  const [, wrongPassword] = await authApi.loginWithEmailAndPassword(
    TEST_EMAIL,
    'wrong password',
  );

  expect(wrongPassword).toBe(BasicErrors.AUTH_WRONG_PASSWORD);
  //#endregion

  //#region check if the login works correct email and password
  await authApi.loginWithEmailAndPassword(TEST_EMAIL, TEST_PASSWORD);
  isLoggedIn = await authApi.isLoggedIn();
  expect(isLoggedIn).toBe(true);
  //#endregion

  //#region check if logout works
  await authApi.logOut();
  isLoggedIn = await authApi.isLoggedIn();
  expect(isLoggedIn).toBe(false);
  //#endregion
});

test('get user id works', async () => {
  const userId = authApi.getUserUid();

  expect(userId).toBe(null);

  await authApi.loginWithEmailAndPassword(TEST_EMAIL, TEST_PASSWORD);
  const user = await admin.auth().getUserByEmail(TEST_EMAIL);
  const newUserId = authApi.getUserUid();

  expect(newUserId).toBe(user.uid);
});

test('check if setUserType, getUserType works', async () => {
  //#region test for UserType.UNKNOWN
  await authApi.loginWithEmailAndPassword(TEST_EMAIL, TEST_PASSWORD);

  const [userType1] = await authApi.getUserType();

  expect(userType1).toBe(UserType.UNKNOWN);
  //#endregion

  //#region test for UserType.TEACHER
  await authApi.setUserType(UserType.TEACHER);

  const [userType2] = await authApi.getUserType();

  expect(userType2).toBe(UserType.TEACHER);
  //#endregion

  //#region test for UserType.STUDENT
  await authApi.setUserType(UserType.STUDENT);

  const [userType3] = await authApi.getUserType();

  expect(userType3).toBe(UserType.STUDENT);
  //#endregion
});

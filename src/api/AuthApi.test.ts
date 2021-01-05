/* eslint-disable import/first */
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
import * as admin from 'firebase-admin';
import AuthApi from './AuthApi';
import { UserType } from '.';

admin.initializeApp({
  projectId: 'attenda-6c9ad',
});

const TEST_EMAIL = 'test@google.com';
const TEST_PASSWORD = '123456';

const authApi = new AuthApi({
  persistence: false,
});

afterAll(async () => {
  const result = await admin.auth().listUsers();

  result.users.forEach(async user => {
    await admin.auth().deleteUser(user.uid);
  });
  const { users } = await admin.auth().listUsers();

  const db = admin.firestore();
  const collections = await db.listCollections();

  collections.forEach(collection => collection.doc().delete());

  expect(users.length).toBe(0);
});

afterEach(async () => {
  await authApi.logOut();
});

test('creation of an account', async () => {
  await authApi.signUpWithEmailAndPassword(TEST_EMAIL, TEST_PASSWORD);
  const { users } = await admin.auth().listUsers();

  expect(users.length).toBe(1);
});

test('check if login, logout works', async () => {
  let isLoggedIn = false;

  isLoggedIn = await authApi.isLoggedIn();
  expect(isLoggedIn).toBe(false);

  await authApi.loginWithEmailAndPassword(TEST_EMAIL, TEST_PASSWORD);
  isLoggedIn = await authApi.isLoggedIn();
  expect(isLoggedIn).toBe(true);
});

test('check if setUserType, getUserType works', async () => {
  await authApi.loginWithEmailAndPassword(TEST_EMAIL, TEST_PASSWORD);

  const [userType1] = await authApi.getUserType();

  expect(userType1).toBe(UserType.UNKNOWN);

  await authApi.setUserType(UserType.TEACHER);

  const [userType2] = await authApi.getUserType();

  expect(userType2).toBe(UserType.TEACHER);

  await authApi.setUserType(UserType.STUDENT);

  const [userType3] = await authApi.getUserType();

  expect(userType3).toBe(UserType.STUDENT);
});

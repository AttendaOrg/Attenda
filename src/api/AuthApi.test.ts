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
  const { users } = await admin.auth().listUsers();

  users.forEach(user => {
    admin.auth().deleteUser(user.uid);
  });
  const { users: newUsers } = await admin.auth().listUsers();

  expect(newUsers.length).toBe(0);

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
});

afterEach(async () => {
  await firebase.auth().signOut();
});

test('creation of an account', async () => {
  const { users } = await admin.auth().listUsers();

  expect(users.length).toBe(0);

  try {
    // successful account creation
    const [success, error] = await authApi.signUpWithEmailAndPassword(
      TEST_EMAIL,
      TEST_PASSWORD,
    );

    expect(success).toBe(true);
    expect(error).toBe(null);
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
  }

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

  const { users: newUsers } = await admin.auth().listUsers();

  expect(newUsers.length).toBe(1);
});

test('check if login, logout works', async () => {
  let isLoggedIn: boolean;

  isLoggedIn = await authApi.isLoggedIn();
  expect(isLoggedIn).toBe(false);

  await authApi.loginWithEmailAndPassword(TEST_EMAIL, TEST_PASSWORD);
  isLoggedIn = await authApi.isLoggedIn();
  expect(isLoggedIn).toBe(true);

  await authApi.logOut();
  isLoggedIn = await authApi.isLoggedIn();
  expect(isLoggedIn).toBe(false);
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

import firebase from 'firebase';
import { UserType } from '.';
import BaseApi, { BasicErrors, WithError } from './BaseApi';
import MetaData, { UserRole } from './model/MetaData';

export enum AuthErrors {
  EMAIL_ALREADY_IN_USE,
}

export default class AuthApi extends BaseApi {
  static readonly META_DATA_COLLECTION_NAME = 'metadata';

  static readonly error = AuthErrors;

  isLoggedIn = async (): Promise<boolean> => {
    return firebase.auth().currentUser !== null;
  };

  loginWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<WithError<boolean>> => {
    try {
      const auth: firebase.auth.UserCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (auth.user !== null) return this.success(true);

      return this.success(false);
    } catch (e) {
      const error: firebase.FirebaseError = e;

      switch (error.code) {
        case 'auth/wrong-password':
          return this.error(BasicErrors.AUTH_WRONG_PASSWORD);
        case 'auth/user-not-found':
          return this.error(BasicErrors.AUTH_USER_NOT_FOUND);
        default:
          // console.log(error);
          break;
      }

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  signUpWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<WithError<boolean>> => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      return this.success(true);
    } catch (e) {
      const error: firebase.FirebaseError = e;

      switch (error.code) {
        case 'auth/email-already-in-use':
          return this.error(BasicErrors.AUTH_EMAIL_ALREADY_IN_USE);
        default:
          break;
      }

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  setUserType = async (type: UserType): Promise<WithError<boolean>> => {
    const user = firebase.auth().currentUser;

    const role: UserRole = type === UserType.TEACHER ? 'teacher' : 'student';
    const data = new MetaData({ role });

    if (user) {
      await firebase
        .firestore()
        .collection(AuthApi.META_DATA_COLLECTION_NAME)
        .doc(user.uid)
        .set(data.toJson());

      return this.success(true);
    }
    // console.log('no login user');

    return this.error(BasicErrors.USER_NOT_AUTHENTICATED);
  };

  getUserType = async (): Promise<WithError<UserType>> => {
    const user = firebase.auth().currentUser;

    if (user) {
      const doc = await firebase
        .firestore()
        .collection(AuthApi.META_DATA_COLLECTION_NAME)
        .doc(user.uid)
        .get();
      const data = doc.data();

      // path not found the data was not initialized
      if (!data) return this.error(BasicErrors.EXCEPTION);

      const metaData = new MetaData((doc.data() as unknown) as MetaData);

      const role: UserType =
        metaData.role === 'teacher' ? UserType.TEACHER : UserType.STUDENT;

      return this.success(role);
    }
    // console.log('no login user');

    return this.error(BasicErrors.USER_NOT_AUTHENTICATED);
  };

  logOut = async (): Promise<void> => {
    await firebase.auth().signOut();
  };
}

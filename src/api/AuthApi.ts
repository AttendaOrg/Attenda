import firebase from 'firebase';
import { UserType } from '.';
import BaseApi, { BasicErrors, WithError } from './BaseApi';
import AccountInfo from './model/AccountInfo';
import MetaData, { UserRole } from './model/MetaData';

export enum AuthErrors {
  EMAIL_ALREADY_IN_USE,
}

interface AuthApiInterface {
  /**
   * gets the user role
   * @returns UserType
   * ```ts
   * UserType.UNKNOWN
   * UserType.STUDENT
   * UserType.TEACHER
   * ```
   */
  getUserType(): Promise<WithError<UserType>>;
  /**
   * sets the user role
   * @param type user role ```UserType.STUDENT | UserType.TEACHER```
   */
  setUserType(type: UserType): Promise<WithError<boolean>>;

  /**
   * sign up with email and password
   * @param email
   * @param password
   */
  signUpWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<WithError<boolean>>;
  /**
   * login with email and password
   * @param email
   * @param password
   */
  loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<WithError<boolean>>;
  /**
   * checks if the user is logged in or not
   * @bug
   * it some time doesn't update immediately after login or sign up
   */
  isLoggedIn(): Promise<boolean>;
  /**
   * log out form the current session
   */
  logOut(): Promise<void>;
  /**
   * change the logged in user password\
   * for this method to work user have to already logged in
   * @param newPassword new password
   */
  changePassword(newPassword: string): Promise<WithError<boolean>>;

  /**
   * gets the account info of logged in user\
   * @see AccountInfo for props
   */
  getAccountInfo(): Promise<WithError<AccountInfo>>;
  /**
   * updates the account info(name/email/role)
   * @param accountInfo account info can handle partial account data
   */
  updateAccountInfo(accountInfo: AccountInfo): Promise<WithError<boolean>>;
}

class AuthApi extends BaseApi implements AuthApiInterface {
  static readonly META_DATA_COLLECTION_NAME = 'metadata';

  static readonly error = AuthErrors;

  static readonly isRoleSelected = (userRole: UserType | null): boolean => {
    if (userRole === UserType.TEACHER) return true;
    if (userRole === UserType.STUDENT) return true;

    return false;
  };

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
    try {
      const user = firebase.auth().currentUser;

      if (user) {
        const doc = await firebase
          .firestore()
          .collection(AuthApi.META_DATA_COLLECTION_NAME)
          .doc(user.uid)
          .get();
        const data = doc.data();

        // path not found the data was not initialized
        // return UNKNOWN ?
        if (!data) return this.success(UserType.UNKNOWN);

        const metaData = new MetaData((doc.data() as unknown) as MetaData);

        switch (metaData.role) {
          case 'student':
            return this.success(UserType.STUDENT);
          case 'teacher':
            return this.success(UserType.TEACHER);
          default:
            return this.success(UserType.UNKNOWN);
        }
      }
      // console.log('no login user');

      return this.error(BasicErrors.USER_NOT_AUTHENTICATED);
    } catch (ex) {
      // console.error(ex);
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  logOut = async (): Promise<void> => {
    await firebase.auth().signOut();
  };

  changePassword = async (): Promise<WithError<boolean>> => {
    throw new Error('Method not implemented.');
  };

  getAccountInfo = async (): Promise<WithError<AccountInfo>> => {
    throw new Error('Method not implemented.');
  };

  updateAccountInfo = async (): Promise<WithError<boolean>> => {
    throw new Error('Method not implemented.');
  };
}

export const authApi = new AuthApi();

export default AuthApi;

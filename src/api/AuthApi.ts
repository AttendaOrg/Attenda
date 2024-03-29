import firebase from 'firebase';
import { UserRole } from '.';
import { analyticsApi, AnalyticsApiDocs } from './analytics';
import BaseApi, { BasicErrors, WithError } from './BaseApi';
import AccountInfo, { AccountInfoProps } from './model/AccountInfo';

export enum AuthErrors {
  EMAIL_ALREADY_IN_USE,
}

interface AuthApiInterface {
  /**
   * gets the user role
   * @returns UserRole
   * ```ts
   * UserRole.UNKNOWN
   * UserRole.STUDENT
   * UserRole.TEACHER
   * ```
   */
  getUserRole(): Promise<WithError<UserRole>>;

  /**
   * sets the user role
   * @param type user role *UserRole.STUDENT | UserRole.TEACHER*
   */
  setUserRole(type: UserRole): Promise<WithError<boolean>>;

  /**
   * sign up with email and password
   * @param email
   * @param password
   */
  signUpWithEmailAndPassword(
    email: string,
    password: string,
    name: string,
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
   * @param currentPassword current password
   * @param newPassword new password
   */
  changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<WithError<boolean>>;

  createAccountInfo(accountInfo: AccountInfo): Promise<WithError<boolean>>;

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

  /**
   * @returns **userId** of the logged in user
   */
  getUserUid(): string | null;

  /**
   * send the user email to rest password
   * @param email
   * @param url {@link firebase.auth.ActionCodeSettings}
   */
  sendPasswordResetEmail(
    email: string,
    url: string,
  ): Promise<WithError<boolean>>;
}

class AuthApi extends BaseApi implements AuthApiInterface {
  static readonly AUTH_ROOT_COLLECTION_NAME = 'acc_metadata';

  static readonly error = AuthErrors;

  static readonly isRoleSelected = (userRole: UserRole | null): boolean =>
    userRole === UserRole.TEACHER || userRole === UserRole.STUDENT;

  public isLoggedIn = async (): Promise<boolean> => {
    return firebase.auth().currentUser !== null;
  };

  sendEmailVerificationCode = async (): Promise<void> => {
    await firebase.auth().currentUser?.sendEmailVerification();
  };

  isAccountVerified = async (): Promise<boolean> => {
    if (firebase.auth().currentUser?.emailVerified === true) return true;

    await firebase.auth().currentUser?.reload();

    return firebase.auth().currentUser?.emailVerified ?? false;
  };

  getUserUid = (): string | null => {
    return firebase.auth().currentUser?.uid ?? null;
  };

  getGooglePhotoUrl = (): string | null => {
    let photoUrl: string | null = null;

    firebase.auth().currentUser?.providerData.forEach(data => {
      if (typeof data?.photoURL === 'string') photoUrl = data?.photoURL;
    });

    return photoUrl;
  };

  getFbPhotoUrl = (accessToken: string): string | null => {
    let photoUrl: string | null = null;

    firebase.auth().currentUser?.providerData.forEach(data => {
      if (typeof data?.photoURL === 'string')
        photoUrl = `${data?.photoURL}?access_token=${accessToken}&type=large`;
    });

    return photoUrl;
  };

  uploadImageToStorage = (url: string | null): void => {
    if (typeof url === 'string') {
      const f = AuthApi.getProfilePicRef();

      console.log(url);

      if (typeof url === 'string') {
        fetch(url)
          .then(res => res.blob())
          .then(blob => {
            console.log('[*] uploading file');

            f.put(blob);
          })
          .then(() => {
            console.log('[*] done');
          });
      }
    } else {
      console.log('invalid url');
    }
  };

  getUserDisplayName = (): string | null => {
    return firebase.auth().currentUser?.displayName ?? null;
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
        case 'auth/invalid-email':
          return this.error(BasicErrors.INVALID_EMAIL);
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
    name: string,
  ): Promise<WithError<boolean>> => {
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      try {
        // NOTE: using firebase auth profile to store name
        await user?.updateProfile({
          displayName: name,
        });
        await this.sendEmailVerificationCode();
      } catch (error) {
        return this.error(BasicErrors.AUTH_NAME_CANT_BE_ADDED);
      }

      return this.success(true);
    } catch (e) {
      const error: firebase.FirebaseError = e;

      switch (error.code) {
        case 'auth/email-already-in-use':
          return this.error(BasicErrors.AUTH_EMAIL_ALREADY_IN_USE);
        case 'auth/weak-password':
          return this.error(BasicErrors.WEAK_PASSWORD);
        default:
          break;
      }

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  setUserRole = async (type: UserRole): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      const updateInfo = new AccountInfo({ role: type });

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const path = firebase
        .firestore()
        .collection(AuthApi.AUTH_ROOT_COLLECTION_NAME)
        .doc(userId);

      const user = await path.get();

      analyticsApi.sendSingle(
        `AuthApi.setUserRole - ${AnalyticsApiDocs.USER_ROLE_READ}`,
      );

      // checks if the path exist
      if (user.exists) {
        analyticsApi.sendSingle(
          `AuthApi.setUserRole - ${AnalyticsApiDocs.USER_ROLE_UPDATE}`,
        );
        await path.update(updateInfo.toJson());
      } else {
        analyticsApi.sendSingle(
          `AuthApi.setUserRole - ${AnalyticsApiDocs.USER_ROLE_WRITE}`,
        );
        // if the path does not exist create a new path
        await path.set(updateInfo.toJson());
      }

      return this.success(true);
    } catch (ex) {
      // console.error(ex);
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getUserRole = async (): Promise<WithError<UserRole>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const doc = await firebase
        .firestore()
        .collection(AuthApi.AUTH_ROOT_COLLECTION_NAME)
        .doc(userId)
        .get();
      const data = doc.data();

      analyticsApi.sendSingle(
        `AuthApi.getUserRole - ${AnalyticsApiDocs.USER_ROLE_READ}`,
      );
      // path not found the data was not initialized
      // return UNKNOWN ?
      if (!data) return this.success(UserRole.UNKNOWN);

      const info = new AccountInfo((doc.data() as unknown) as AccountInfoProps);

      switch (info.role) {
        case 'student':
          return this.success(UserRole.STUDENT);
        case 'teacher':
          return this.success(UserRole.TEACHER);
        default:
          return this.success(UserRole.UNKNOWN);
      }
      // console.log('no login user');
    } catch (ex) {
      console.error(ex);

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  logOut = async (): Promise<void> => {
    await firebase.auth().signOut();
  };

  changePassword = async (
    currentPassword: string,
    newPassword: string,
  ): Promise<WithError<boolean>> => {
    try {
      const user = firebase.auth().currentUser;

      if (user !== null && user.email !== null) {
        const emailCred = firebase.auth.EmailAuthProvider.credential(
          user.email,
          currentPassword,
        );

        await user.reauthenticateWithCredential(emailCred);
        // User successfully reauthenticated.

        await user.updatePassword(newPassword);

        return this.success(true);
      }

      return this.error(BasicErrors.USER_NOT_AUTHENTICATED);
    } catch (ex) {
      const error: firebase.FirebaseError = ex;

      switch (error.code) {
        case 'auth/wrong-password':
          return this.error(BasicErrors.AUTH_WRONG_PASSWORD);
        case 'auth/user-not-found':
          return this.error(BasicErrors.AUTH_USER_NOT_FOUND);
        case 'auth/invalid-email':
          return this.error(BasicErrors.INVALID_EMAIL);
        default:
          // console.log(error);
          break;
      }

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  getAccountInfo = async (): Promise<WithError<AccountInfo>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      const email = firebase.auth().currentUser?.email ?? '';
      const name = firebase.auth().currentUser?.displayName ?? '';
      const profilePicUrl = firebase.auth().currentUser?.photoURL ?? '';

      const doc = await firebase
        .firestore()
        .collection(AuthApi.AUTH_ROOT_COLLECTION_NAME)
        .doc(userId)
        .get();
      const data = doc.data();

      analyticsApi.sendSingle(
        `AuthApi.getAccountInfo - ${AnalyticsApiDocs.ACC_INFO_READ}`,
      );

      // path not found the data was not initialized
      // return UNKNOWN ?
      if (!data) return this.error(BasicErrors.EXCEPTION);

      const accountInfoData = (doc.data() as unknown) as AccountInfoProps;

      const info = new AccountInfo({
        ...accountInfoData,
        email,
        name,
        profilePicUrl,
      });

      return this.success(info);
      // console.log('no login user');
    } catch (ex) {
      // console.error(ex);
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  updateAccountInfo = async (
    accountInfo: Partial<AccountInfoProps>,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();
      const currName = firebase.auth().currentUser?.displayName;

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      await firebase
        .firestore()
        .collection(AuthApi.AUTH_ROOT_COLLECTION_NAME)
        .doc(userId)
        .update(accountInfo);

      analyticsApi.sendSingle(
        `AuthApi.updateAccountInfo - ${AnalyticsApiDocs.ACC_INFO_UPDATE}`,
      );

      if (accountInfo.name !== currName) {
        console.info('NOTICE: using database for the name');
        await firebase.auth().currentUser?.updateProfile({
          displayName: accountInfo.name,
        });
      }

      return this.success(true);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  updateName = async (name: string): Promise<WithError<boolean>> => {
    try {
      await firebase.auth().currentUser?.updateProfile({
        displayName: name,
      });

      // TODO: in teacher case update the name in all created class

      return this.success(true);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  createAccountInfo = async (
    accountInfo: AccountInfo,
  ): Promise<WithError<boolean>> => {
    try {
      const userId = this.getUserUid();

      if (userId === null)
        return this.error(BasicErrors.USER_NOT_AUTHENTICATED);

      await firebase
        .firestore()
        .collection(AuthApi.AUTH_ROOT_COLLECTION_NAME)
        .doc(userId)
        .set(accountInfo.toJson());

      analyticsApi.sendSingle(
        `AuthApi.createAccountInfo - ${AnalyticsApiDocs.ACC_INFO_WRITE}`,
      );

      return this.success(true);
    } catch (e) {
      return this.error(BasicErrors.EXCEPTION);
    }
  };

  sendPasswordResetEmail = async (
    email: string,
    url: string,
  ): Promise<WithError<boolean>> => {
    try {
      const actionCodeSettings: firebase.auth.ActionCodeSettings = {
        url,
      };

      await firebase.auth().sendPasswordResetEmail(email, actionCodeSettings);

      return this.success(true);
    } catch (e) {
      const error: firebase.FirebaseError = e;

      switch (error.code) {
        case 'auth/user-not-found':
          return this.error(BasicErrors.AUTH_USER_NOT_FOUND);
        case 'auth/invalid-email':
          return this.error(BasicErrors.INVALID_EMAIL);
        default:
          // console.log(error);
          break;
      }

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  verifyPasswordResetEmail = async (
    obbCode: string,
    newPassword: string,
  ): Promise<WithError<boolean>> => {
    try {
      const email: string = await firebase
        .auth()
        .verifyPasswordResetCode(obbCode);

      await firebase.auth().confirmPasswordReset(obbCode, newPassword);

      const [success, error] = await this.loginWithEmailAndPassword(
        email,
        newPassword,
      );

      console.log(success, error);

      return this.success(success);
    } catch (e) {
      const error: firebase.FirebaseError = e;

      switch (error.code) {
        case 'auth/user-not-found':
          return this.error(BasicErrors.AUTH_USER_NOT_FOUND);
        case 'auth/invalid-email':
          return this.error(BasicErrors.INVALID_EMAIL);
        case 'auth/invalid-action-code':
          return this.error(BasicErrors.OOB_CODE_NOT_VALID);
        default:
          // console.log(error);
          break;
      }

      return this.error(BasicErrors.EXCEPTION);
    }
  };

  static getProfilePicRef = (userId?: string): firebase.storage.Reference => {
    return firebase
      .storage()
      .ref()
      .child('public')
      .child('profiles')
      .child(`${userId ?? firebase.auth().currentUser?.uid}` ?? '');
  };

  uploadProfileImage = async (uri: string): Promise<void> => {
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create a Storage Ref w/ username
    const storageRef = AuthApi.getProfilePicRef();

    const task = storageRef.put(blob);

    task.then(async e => {
      const photoURL = await e.ref.getDownloadURL();

      await firebase.auth().currentUser?.updateProfile({
        photoURL,
      });

      await this.updateAccountInfo(
        AccountInfo.Update({
          profilePicUrl: photoURL,
        }),
      );
    });
  };

  getMyProfilePic = (): string => {
    return firebase.auth().currentUser?.photoURL ?? '';
  };
}

export const authApi = new AuthApi();

export default AuthApi;

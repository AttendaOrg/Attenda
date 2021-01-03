import firebase from 'firebase';
import BaseApi from './BaseApi';

export default class AuthApi extends BaseApi {
  isLoggedIn = async (): Promise<boolean> => {
    return firebase.auth().currentUser !== null;
  };

  loginWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    const auth: firebase.auth.UserCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    if (auth.user !== null) return true;

    return false;
  };

  signUpWithEmailAndPassword = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      return true;
    } catch (error) {
      // console.log(error);

      return false;
    }
  };
}

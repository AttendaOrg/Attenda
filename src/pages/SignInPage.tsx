import React, { useContext, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';

import { ResponseType } from 'expo-auth-session';
import firebase from 'firebase';
import { RootStackParamList } from '../App';
import SignIn from '../components/organisms/AppIntro/SignIn';
import { NoHeaderNavigationOptions } from '../components/templates/SimpleCloseNavigationOption';
import { authApi } from '../api/AuthApi';
import { BasicErrors } from '../api/BaseApi';
import SingleButtonPopup from '../components/molecules/SingleButtonPopup';
import GlobalContext, { GlobalContextType } from '../context/GlobalContext';
import { isValidEmail } from '../util';
import { FB_APP_ID, GOOGLE_GUID } from '../util/constant';

type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

export const SignInPageNavigationOptions: StackNavigationOptions = NoHeaderNavigationOptions;

WebBrowser.maybeCompleteAuthSession();

const SignInPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [tryFormSubmit, setTryFormSubmit] = useState(false);
  const globalContext = useContext(GlobalContext) as GlobalContextType;
  const [, response, promptGoogleSignInAsync] = Google.useAuthRequest({
    expoClientId: `${GOOGLE_GUID}.apps.googleusercontent.com`,
    iosClientId: `${GOOGLE_GUID}.apps.googleusercontent.com`,
    androidClientId: `${GOOGLE_GUID}.apps.googleusercontent.com`,
    webClientId: `${GOOGLE_GUID}.apps.googleusercontent.com`,
  });

  const [
    request,
    fbResponse,
    promptFacebookSignInAsync,
  ] = Facebook.useAuthRequest({
    clientId: `${FB_APP_ID}`,
    responseType: ResponseType.Token,
  });

  React.useEffect(() => {
    (async () => {
      if (response?.type === 'success') {
        const { authentication } = response;

        const q = firebase.auth.GoogleAuthProvider.credential(
          authentication?.idToken ?? null,
          authentication?.accessToken,
        );

        globalContext.changeSpinnerLoading(true);
        await firebase.auth().signInWithCredential(q);
        globalContext.changeSpinnerLoading(false);

        const url = authApi.getGooglePhotoUrl();

        if (typeof url === 'string') authApi.uploadProfileImage(url);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  React.useEffect(() => {
    (async () => {
      if (fbResponse?.type === 'success') {
        const { authentication } = fbResponse;

        if (
          authentication !== null &&
          (authentication.accessToken !== null ||
            authentication.accessToken !== undefined)
        ) {
          const q = firebase.auth.FacebookAuthProvider.credential(
            authentication.accessToken,
          );

          globalContext.changeSpinnerLoading(true);
          await firebase.auth().signInWithCredential(q);
          globalContext.changeSpinnerLoading(false);
          const fbUrl = authApi.getFbPhotoUrl(authentication.accessToken);

          if (typeof fbUrl === 'string') authApi.uploadProfileImage(fbUrl);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbResponse]);

  // #region error validation logic

  const revalidateError = (_email: string, _password: string) => {
    if (isValidEmail(_email) !== true)
      setEmailError('Please enter a valid email.');
    else if (isValidEmail(_email) === true) setEmailError('');

    if (_password === '') setPasswordError('Please enter a valid password.');
    else if (_password !== '') setPasswordError('');
  };

  const tryRevalidateError = ({
    _email = email,
    _password = password,
    _tryFormSubmit = false,
  } = {}) => {
    if (_tryFormSubmit || tryFormSubmit === true)
      revalidateError(_email, _password);
  };

  const updateEmail = (_email: string) => {
    setEmail(_email);
    tryRevalidateError({
      _email,
    });
  };

  const updatePassword = (_password: string) => {
    setPassword(_password);
    tryRevalidateError({
      _password,
    });
  };

  //#endregion

  const loginUser = async () => {
    if (await globalContext.throwNetworkError()) return;

    if (await authApi.isLoggedIn()) {
      navigation.push('ChooseRole');

      return;
    }
    // if the email or password is empty we don't need to call the api
    if (email !== '' || password !== '') {
      // show a progress bar for the sign in
      globalContext.changeSpinnerLoading(true);
      const [, errorCode] = await authApi.loginWithEmailAndPassword(
        email,
        password,
      );

      // INFO: the loader will be disable by the onAuthChange callback function
      // globalContext.changeSpinnerLoading(false);
      if (errorCode != null) {
        // if there is any error the spinner will not hide automatically so disable the spinner manually
        globalContext.changeSpinnerLoading(false);
        switch (errorCode) {
          case BasicErrors.AUTH_USER_NOT_FOUND:
            setShowPopup(true);
            setErrorMessage(
              'This email address is not registered with us. Please create an account.',
            );
            break;
          case BasicErrors.AUTH_WRONG_PASSWORD:
            setShowPopup(true);
            setErrorMessage("Email and password combination doesn't match");
            break;
          case BasicErrors.INVALID_EMAIL:
            setShowPopup(true);
            setErrorMessage('The email is not valid.');
            break;
          default:
            setShowPopup(true);
            setErrorMessage('Something went wrong.');
            break;
        }
      }
      // we don't need to do any thing because if the login is successful the navigation will happen automatically.
    } else {
      // if the email or password is empty show errors
      setTryFormSubmit(true);
      tryRevalidateError({
        _tryFormSubmit: true,
      });
    }
  };

  return (
    <>
      <SignIn
        email={email}
        password={password}
        onEmailChange={updateEmail}
        onPasswordChange={updatePassword}
        onForgotPasswordClick={() => {
          navigation.push('ForgotPassword');
        }}
        onCreateNewAccountClick={() => {
          navigation.push('SignUp');
        }}
        onSignInClick={loginUser}
        onGoogleClick={() => promptGoogleSignInAsync()}
        onFaceBookClick={() => promptFacebookSignInAsync()}
        onTwitterClick={() => null}
        errors={{ emailError, passwordError }}
      />
      <SingleButtonPopup
        visible={showPopup}
        title="Oops..."
        text={errorMessage}
        buttonText="Ok"
        onButtonClick={() => setShowPopup(false)}
        onDismiss={() => setShowPopup(false)}
      />
    </>
  );
};

export default SignInPage;

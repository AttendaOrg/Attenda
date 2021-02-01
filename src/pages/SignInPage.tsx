import React, { useContext, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import SignIn from '../components/organisms/AppIntro/SignIn';
import { NoHeaderNavigationOptions } from '../components/templates/SimpleCloseNavigationOption';
import { authApi } from '../api/AuthApi';
import { BasicErrors } from '../api/BaseApi';
import SingleButtonPopup from '../components/molecules/SingleButtonPopup';
import GlobalContext, { GlobalContextType } from '../context/GlobalContext';
import { isValidEmail } from '../util';

type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

export const SignInPageNavigationOptions: StackNavigationOptions = NoHeaderNavigationOptions;

const SignInPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [tryFormSubmit, setTryFormSubmit] = useState(false);
  const globalContext = useContext(GlobalContext) as GlobalContextType;

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
    // if the email or password is empty we don't need to call the api
    if (email !== '' || password !== '') {
      // show a progress bar for the sign in
      globalContext.changeSpinnerLoading(true);
      const [, errorCode] = await authApi.loginWithEmailAndPassword(
        email,
        password,
      );

      globalContext.changeSpinnerLoading(false);
      if (errorCode != null) {
        switch (errorCode) {
          case BasicErrors.AUTH_USER_NOT_FOUND:
            setShowPopup(true);
            setErrorMessage(
              'This email address not registered with us please create an account',
            );
            break;
          case BasicErrors.AUTH_WRONG_PASSWORD:
            setShowPopup(true);
            setErrorMessage("Email and password combination doesn't match");
            break;
          default:
            setShowPopup(true);
            setErrorMessage('Some Error Occurred');
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
        onGoogleClick={() => null}
        onFaceBookClick={() => null}
        onTwitterClick={() => null}
        errors={{ emailError, passwordError }}
      />
      <SingleButtonPopup
        visible={showPopup}
        title="Error"
        text={errorMessage}
        buttonText="Ok"
        onButtonClick={() => setShowPopup(false)}
        onDismiss={() => setShowPopup(false)}
      />
    </>
  );
};

export default SignInPage;

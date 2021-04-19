import React, { useContext, useState } from 'react';
import { Linking } from 'react-native';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import SignUpPage from '../components/organisms/AppIntro/SignUp';
import SimpleCloseNavigationOptions from '../components/templates/SimpleCloseNavigationOption';
import { PRIVACY_POLICY_URL, TERMS_URL } from '../util/constant';
import SingleButtonPopup from '../components/molecules/SingleButtonPopup';
import { authApi } from '../api/AuthApi';
import GlobalContext from '../context/GlobalContext';
import { isStrongPassword, isValidEmail } from '../util';
import { BasicErrors } from '../api/BaseApi';

type Props = StackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUpPageNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;

const SignUpPagePage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [showConfirmEmailPopup, setShowConfirmEmailPopup] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [acceptTermsError, setAcceptTermsError] = useState('');
  const globalContext = useContext(GlobalContext);

  const revalidateError = (
    username: string,
    email: string,
    password: string,
    acceptTerms: boolean,
  ): boolean => {
    let retType = true;

    if (username.length < 3) {
      setUsernameError('Name must contain at least 3 letters.');
      retType = false;
    } else setUsernameError('');

    if (isValidEmail(email) !== true) {
      setEmailError('Please enter a valid email.');
      retType = false;
    } else if (isValidEmail(email) === true) setEmailError('');

    if (isStrongPassword(password) !== true) {
      setPasswordError('Please enter a stronger password.');
      retType = false;
    } else if (isStrongPassword(password) === true) setPasswordError('');

    if (acceptTerms === false) {
      setAcceptTermsError('Please accept the terms and condition.');
      retType = false;
    }
    if (acceptTerms === true) setAcceptTermsError('');

    return retType;
  };

  const handleOnSubmit = async (
    username: string,
    email: string,
    password: string,
    acceptTerms: boolean,
  ) => {
    globalContext.changeSpinnerLoading(true);
    if (revalidateError(username, email, password, acceptTerms)) {
      // TODO: add validation for network related error and firebase error

      const [success, error] = await authApi.signUpWithEmailAndPassword(
        email,
        password,
        username,
      );

      if (error === BasicErrors.AUTH_EMAIL_ALREADY_IN_USE) {
        setEmailError('Email address is already in used');
      }
      if (error === BasicErrors.INVALID_EMAIL) {
        setEmailError('Invalid email address');
      }

      // if success is true dismiss the popup
      // the rest will be done by the onAuthListener
      if (success === true) {
        setShowConfirmEmailPopup(false);
      }
    }
    globalContext.changeSpinnerLoading(false);
  };

  return (
    <>
      <SignUpPage
        onSignInClick={navigation.goBack}
        onSubmit={handleOnSubmit}
        onTermsClick={() => Linking.openURL(TERMS_URL)}
        onPrivacyPolicyClick={() => Linking.openURL(PRIVACY_POLICY_URL)}
        errors={{
          username: usernameError,
          email: emailError,
          password: passwordError,
          acceptTerms: acceptTermsError,
        }}
        revalidateError={revalidateError}
      />

      <SingleButtonPopup
        visible={showConfirmEmailPopup}
        title="Confirm Email"
        text="We have sent you a mail. Please confirm it."
        buttonText="Ok"
        onDismiss={() => setShowConfirmEmailPopup(false)}
        onButtonClick={() => null}
      />
    </>
  );
};

export default SignUpPagePage;

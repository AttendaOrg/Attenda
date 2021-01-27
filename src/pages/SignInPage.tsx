import React, { useContext, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import SignIn from '../components/organisms/AppIntro/SignIn';
import { NoHeaderNavigationOptions } from '../components/templates/SimpleCloseNavigationOption';
import { authApi } from '../api/AuthApi';
import { BasicErrors, convertErrorToMsg } from '../api/BaseApi';
import SingleButtonPopup from '../components/molecules/SingleButtonPopup';
import GlobalContext, { GlobalContextType } from '../context/GlobalContext';

type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

export const SignInPageNavigationOptions: StackNavigationOptions = NoHeaderNavigationOptions;
// HEADER_AB_TEST_NEW
//   ? { ...SimpleHeaderBackNavigationOptions, title: 'Sign In' }
//   :
// {
//   headerShown: false,
// };

const SignInPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error');
  const globalContext = useContext(GlobalContext) as GlobalContextType;

  const loginUser = async () => {
    globalContext.changeSpinnerLoading(true);
    // TODO: show a progress bar for the sign in
    const [s, errorCode] = await authApi.loginWithEmailAndPassword(
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
        default:
          setShowPopup(true);
          setErrorMessage('Some Error Occurred');
          break;
      }
    }
    console.log(s, convertErrorToMsg(errorCode));
  };

  return (
    <>
      <SignIn
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
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

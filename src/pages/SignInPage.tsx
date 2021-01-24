import React, { useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import SignIn from '../components/organisms/AppIntro/SignIn';
import { NoHeaderNavigationOptions } from '../components/templates/SimpleCloseNavigationOption';
import { authApi } from '../api/AuthApi';
import { convertErrorToMsg } from '../api/BaseApi';

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

  const loginUser = async () => {
    // TODO: show a progress bar for the sign in
    const [s, e] = await authApi.loginWithEmailAndPassword(email, password);

    console.log(s, convertErrorToMsg(e));
  };

  return (
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
  );
};

export default SignInPage;

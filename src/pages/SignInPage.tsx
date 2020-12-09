import React, { useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import SignIn from '../components/organisms/SignIn';

type Props = StackScreenProps<RootStackParamList, 'SignIn'>;

export const SignInPageNavigationOptions: StackNavigationOptions = {
  headerShown: false,
};

const SignInPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SignIn
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onFaceBookClick={() => null}
      onForgotPasswordClick={() => {
        navigation.push('ForgotPassword');
      }}
      onCreateNewAccountClick={() => {
        navigation.push('SignUp');
      }}
      onGoogleClick={() => null}
      onSignInClick={() => null}
      onTwitterClick={() => null}
    />
  );
};

export default SignInPage;

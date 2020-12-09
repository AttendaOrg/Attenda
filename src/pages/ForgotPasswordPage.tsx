import React, { useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import ForgotPassword from '../components/organisms/ForgotPassword';
import SimpleCloseNavigationOptions from '../components/templates/SimpleCloseNavigationOption';

type Props = StackScreenProps<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;

const ForgotPasswordPage: React.FC<Props> = (): JSX.Element => {
  const [email, setEmail] = useState('');

  return (
    <ForgotPassword
      email={email}
      onEmailChange={setEmail}
      onSend={() => null}
    />
  );
};

export default ForgotPasswordPage;

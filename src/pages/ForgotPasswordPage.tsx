import React, { useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import ForgotPassword from '../components/organisms/AppIntro/ForgotPassword';
import SimpleCloseNavigationOptions from '../components/templates/SimpleCloseNavigationOption';
import SingleButtonPopup from '../components/molecules/SingleButtonPopup';

type Props = StackScreenProps<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;

const ForgotPasswordPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [email, setEmail] = useState('');
  const [showSuccessEmailSendPopup, setShowSuccessEmailSendPopup] = useState(
    false,
  );

  return (
    <>
      <ForgotPassword
        email={email}
        onEmailChange={setEmail}
        onSend={() => setShowSuccessEmailSendPopup(true)}
      />
      <SingleButtonPopup
        visible={showSuccessEmailSendPopup}
        title="Success"
        text="Your Password Reset link has been sent to your email.Please check your mail."
        buttonText="Ok"
        onDismiss={() => setShowSuccessEmailSendPopup(false)}
        onButtonClick={() => navigation.navigate('SignIn')}
      />
    </>
  );
};

export default ForgotPasswordPage;

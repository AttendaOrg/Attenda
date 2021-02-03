import React, { useState, useContext } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import ForgotPassword from '../components/organisms/AppIntro/ForgotPassword';
import SimpleCloseNavigationOptions from '../components/templates/SimpleCloseNavigationOption';
import SingleButtonPopup from '../components/molecules/SingleButtonPopup';
import GlobalContext from '../context/GlobalContext';
import { authApi } from '../api/AuthApi';
import { BasicErrors, convertErrorToMsg } from '../api/BaseApi';
// import { useContext } from 'react';

type Props = StackScreenProps<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;
// HEADER_AB_TEST_NEW
//   ? { ...SimpleHeaderBackNavigationOptions, title: 'Forgot Password' }
//   : SimpleCloseNavigationOptions;

const ForgotPasswordPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const globalContext = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [showSuccessEmailSendPopup, setShowSuccessEmailSendPopup] = useState(
    false,
  );
  const [showFailedEmailSendPopup, setShowFailedEmailSendPopup] = useState(
    false,
  );
  const [errorMessage, setErrorMessage] = useState(
    'Something went wrong. Please try again later.',
  );

  const handleOnSend = async () => {
    globalContext.changeSpinnerLoading(true);

    const [success, error] = await authApi.sendPasswordResetEmail(
      email,
      'http://dummy/url',
    );

    globalContext.changeSpinnerLoading(false);

    if (success === true) {
      setShowSuccessEmailSendPopup(true);
    } else {
      switch (error) {
        case BasicErrors.AUTH_USER_NOT_FOUND:
          setShowFailedEmailSendPopup(true);
          setErrorMessage(
            'This email address not registered with us. Please create an account',
          );
          break;
        case BasicErrors.INVALID_EMAIL:
          setShowFailedEmailSendPopup(true);
          setErrorMessage('Please check the email you have entered');
          break;
        default:
          setShowFailedEmailSendPopup(true);
          setErrorMessage('Something went wrong. Please try again later.');
          break;
      }
      console.log(success, convertErrorToMsg(error));
    }
  };

  return (
    <>
      <ForgotPassword
        email={email}
        onEmailChange={setEmail}
        // onSend={() => setShowSuccessEmailSendPopup(true)}
        onSend={handleOnSend}
      />
      <SingleButtonPopup
        visible={showSuccessEmailSendPopup}
        title="Success"
        text="The password reset link has been sent to your email. Please check your mail."
        buttonText="Ok"
        onDismiss={() => setShowSuccessEmailSendPopup(false)}
        onButtonClick={() => navigation.navigate('SignIn')}
      />
      <SingleButtonPopup
        visible={showFailedEmailSendPopup}
        title="Ooops..."
        text={errorMessage}
        buttonText="Ok"
        onDismiss={() => setShowFailedEmailSendPopup(false)}
        onButtonClick={() => setShowFailedEmailSendPopup(false)}
      />
    </>
  );
};

export default ForgotPasswordPage;

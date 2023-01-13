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
import { isValidEmail } from '../util';
// import { useContext } from 'react';

type Props = StackScreenProps<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;
// HEADER_AB_TEST_NEW
//   ? { ...SimpleHeaderBackNavigationOptions, title: 'Forgot Password' }
//   : SimpleCloseNavigationOptions;

const ForgotPasswordPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const globalContext = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasTriedSubmitting, setHasTriedSubmitting] = useState(false);
  const [showSuccessEmailSendPopup, setShowSuccessEmailSendPopup] = useState(
    false,
  );

  const revalidateError = (_email: string): boolean => {
    if (!isValidEmail(_email)) {
      // if there is error field is empty only then update it
      // if not we don't need to update it because it could cause
      // an un necessary re-render
      if (emailError === '') setEmailError('Please enter a valid email.');

      return false;
    }
    if (emailError !== '') setEmailError('');

    return true;
  };

  const updateEmail = (_email: string) => {
    if (hasTriedSubmitting) revalidateError(_email);
    setEmail(_email);
  };

  const handleOnSend = async () => {
    if (await globalContext.throwNetworkError()) return;

    if (hasTriedSubmitting === false) setHasTriedSubmitting(true);
    // if the error validation fails we don't need to call the api
    // because the validation will fail only if we have a invalid
    if (!revalidateError(email)) return;

    globalContext.changeSpinnerLoading(true);

    const [success, error] = await authApi.sendPasswordResetEmail(
      email,
      'http://localhost:19006',
    );

    globalContext.changeSpinnerLoading(false);

    if (success === true) {
      setShowSuccessEmailSendPopup(true);
    } else {
      switch (error) {
        case BasicErrors.AUTH_USER_NOT_FOUND:
          setEmailError(
            'This email address is not registered with us. Please create an account',
          );
          break;
        case BasicErrors.INVALID_EMAIL:
          setEmailError('Please check the email you have entered');
          break;
        default:
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
        onEmailChange={updateEmail}
        // onSend={() => setShowSuccessEmailSendPopup(true)}
        onSend={handleOnSend}
        errors={{ emailError }}
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
        visible={errorMessage !== ''}
        title="Ooops..."
        text={errorMessage}
        buttonText="Ok"
        onDismiss={() => setErrorMessage('')}
        onButtonClick={() => setErrorMessage('')}
      />
    </>
  );
};

export default ForgotPasswordPage;

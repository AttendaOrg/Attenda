import React, { useState } from 'react';
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

type Props = StackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUpPageNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;
// HEADER_AB_TEST_NEW
//   ? { ...SimpleHeaderBackNavigationOptions, title: 'Create An Account' }
//   : SimpleCloseNavigationOptions;
// {
//   headerShown: false,
// };

const SignUpPagePage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [showConfirmEmailPopup, setShowConfirmEmailPopup] = useState(false);

  return (
    <>
      <SignUpPage
        onSignUpClick={navigation.goBack}
        onSubmit={() => setShowConfirmEmailPopup(true)}
        onTermsClick={() => Linking.openURL(TERMS_URL)}
        onPrivacyPolicyClick={() => Linking.openURL(PRIVACY_POLICY_URL)}
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

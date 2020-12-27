import React from 'react';
import { Linking } from 'react-native';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import SignUpPage from '../components/organisms/AppIntro/SignUp';
import SimpleCloseNavigationOptions from '../components/templates/SimpleCloseNavigationOption';
import { PRIVACY_POLICY_URL, TERMS_URL } from '../util/constant';

type Props = StackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUpPageNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;
// HEADER_AB_TEST_NEW
//   ? { ...SimpleHeaderBackNavigationOptions, title: 'Create An Account' }
//   : SimpleCloseNavigationOptions;
// {
//   headerShown: false,
// };

const SignUpPagePage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <SignUpPage
      onSignUpClick={navigation.goBack}
      onSubmit={() => null}
      onTermsClick={() => Linking.openURL(TERMS_URL)}
      onPrivacyPolicyClick={() => Linking.openURL(PRIVACY_POLICY_URL)}
    />
  );
};

export default SignUpPagePage;

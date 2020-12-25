import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import SignUpPage from '../components/organisms/AppIntro/SignUp';
import SimpleCloseNavigationOptions from '../components/templates/SimpleCloseNavigationOption';
import { HEADER_AB_TEST_NEW } from '../util/constant';
import { SimpleHeaderBackNavigationOptions } from '../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUpPageNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;
// HEADER_AB_TEST_NEW
//   ? { ...SimpleHeaderBackNavigationOptions, title: 'Create An Account' }
//   : SimpleCloseNavigationOptions;
// {
//   headerShown: false,
// };

const SignUpPagePage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return <SignUpPage onSignUpClick={navigation.goBack} onSubmit={() => null} />;
};

export default SignUpPagePage;

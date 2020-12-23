import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import SignUpPage from '../components/organisms/AppIntro/SignUp';
import SimpleCloseNavigationOptions from '../components/templates/SimpleCloseNavigationOption';

type Props = StackScreenProps<RootStackParamList, 'SignUp'>;

export const SignUpPageNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;

const SignUpPagePage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return <SignUpPage onSignUpClick={navigation.goBack} onSubmit={() => null} />;
};

export default SignUpPagePage;

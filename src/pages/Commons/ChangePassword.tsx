import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';
import ChangePassword from '../../components/organisms/Common/ChangePassword';

type Props = StackScreenProps<RootStackParamList, 'ChangePassword'>;

export const ChangePasswordNavigationOptions: StackNavigationOptions = {
  ...SimpleCloseNavigationOptions,
  title: 'Change Password',
};

const ChangePasswordPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return <ChangePassword onDone={() => navigation.goBack()} />;
};

export default ChangePasswordPage;

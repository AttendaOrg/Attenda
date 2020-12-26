import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import ChangePassword from '../../components/organisms/Common/ChangePassword';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'ChangePassword'>;

export const ChangePasswordNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Change Password',
};

const ChangePasswordPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return <ChangePassword onDone={() => navigation.goBack()} />;
};

export default ChangePasswordPage;

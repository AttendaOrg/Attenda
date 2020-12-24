import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import MyAccount from '../../components/organisms/Common/MyAccount';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'MyAccount'>;

export const MyAccountNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'My Account',
};

const MyAccountPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <MyAccount
      username="Aditiya jhv"
      email="adi@gmail.com"
      studentRole="student"
      onEditUsernameClick={() => null}
      onChangePasswordClick={() => navigation.push('ChangePassword')}
      // QUESTION: should reset the stack ?
      onLogOutClick={() => navigation.navigate('SignIn')}
      onEditProfilePictureClick={() => null}
    />
  );
};

export default MyAccountPage;

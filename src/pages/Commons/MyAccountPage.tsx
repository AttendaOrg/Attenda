import React, { useState } from 'react';
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
  const [showLogOutPopup, setShowLogOutPopup] = useState(false);

  return (
    <MyAccount
      username="Aditiya jhv"
      email="adi@gmail.com"
      studentRole="student"
      onEditUsernameClick={() => null}
      onChangePasswordClick={() => navigation.push('ChangePassword')}
      // QUESTION: should reset the stack ?
      showPopup={showLogOutPopup}
      onDismissPopup={() => setShowLogOutPopup(false)}
      onPositivePopupClick={() => {
        navigation.navigate('SignIn');
      }}
      // onLogOutClick={() => navigation.navigate('SignIn')}
      onLogOutClick={() => setShowLogOutPopup(true)}
      onEditProfilePictureClick={() => null}
    />
  );
};

export default MyAccountPage;

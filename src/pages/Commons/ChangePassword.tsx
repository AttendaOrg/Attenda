import React, { useState } from 'react';
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
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);

  return (
    <ChangePassword
      showPopup={showChangePasswordPopup}
      onDismissPopup={() => setShowChangePasswordPopup(false)}
      onPositivePopupClick={() => {
        // navigation.navigate('TeacherClassList', { withDismiss: true });
        navigation.goBack();
      }}
      // onDone={() => navigation.goBack()}
      onDone={() => setShowChangePasswordPopup(true)}
    />
  );
};

export default ChangePasswordPage;

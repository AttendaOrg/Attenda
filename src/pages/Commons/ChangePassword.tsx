import React, { useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import ChangePassword from '../../components/organisms/Common/ChangePassword';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import SingleButtonPopup from '../../components/molecules/SingleButtonPopup';

type Props = StackScreenProps<RootStackParamList, 'ChangePassword'>;

export const ChangePasswordNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Change Password',
};

const ChangePasswordPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);

  return (
    <>
      <ChangePassword onDone={() => setShowChangePasswordPopup(true)} />

      <SingleButtonPopup
        visible={showChangePasswordPopup}
        title="Success"
        text="Your password has changed."
        buttonText="Ok"
        onDismiss={() => setShowChangePasswordPopup(false)}
        onButtonClick={() => navigation.goBack()}
      />
    </>
  );
};

export default ChangePasswordPage;

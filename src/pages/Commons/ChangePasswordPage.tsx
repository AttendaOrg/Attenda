import React, { useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import ChangePassword from '../../components/organisms/Common/ChangePassword';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import SingleButtonPopup from '../../components/molecules/SingleButtonPopup';
import { authApi } from '../../api/AuthApi';
import { isStrongPassword } from '../../util';
import { BasicErrors } from '../../api/BaseApi';

type Props = StackScreenProps<RootStackParamList, 'ChangePassword'>;

export const ChangePasswordNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Change Password',
};

const ChangePasswordPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const revalidateError = (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    // #region current password error validation
    if (currentPassword === '')
      setCurrentPasswordError('Please Enter your current password');
    if (currentPassword !== '') setCurrentPasswordError('');
    // #endregion

    // #region new password error validation
    if (!isStrongPassword(newPassword))
      setNewPasswordError('Please enter a strong password');
    if (newPassword === '') setNewPasswordError('Please enter a new password');
    if (isStrongPassword(newPassword)) setNewPasswordError('');
    // #endregion

    //#region confirm password validation
    if (newPassword !== confirmPassword)
      setConfirmPasswordError(
        "Your new password and confirm password doesn't match. ",
      );
    if (newPassword === confirmPassword) setConfirmPasswordError('');
    //#endregion

    if (
      (currentPassword !== '' || newPassword !== '') &&
      currentPassword === newPassword
    )
      setNewPasswordError("Current password and new password can't be same.");
  };

  /**
   * check if we should call api to change the password
   * @param currentPass
   * @param newPass
   * @param confirmPass
   */
  const shouldChangePassword = (
    currentPass: string,
    newPass: string,
    confirmPass: string,
  ): boolean => {
    revalidateError(currentPass, newPass, confirmPass);
    if (newPass === '') return false;
    if (currentPass === '') return false;
    if (confirmPass === '') return false;
    if (newPass !== confirmPass) return false;
    if (newPass === currentPass) return false;
    if (!isStrongPassword(newPass)) return false;

    return true;
  };

  const changePassword = async (
    currentPass: string,
    newPass: string,
    confirmPass: string,
  ) => {
    if (shouldChangePassword(currentPass, newPass, confirmPass)) {
      const [success, error] = await authApi.changePassword(
        currentPass,
        newPass,
      );

      switch (error) {
        case BasicErrors.AUTH_WRONG_PASSWORD:
          setCurrentPasswordError('The password is invalid.');
          break;
        case BasicErrors.WEAK_PASSWORD:
          setNewPasswordError('Please enter a stronger password.');
          break;
        default:
          break;
      }

      if (success === true) setShowChangePasswordPopup(true);
    }
  };

  return (
    <>
      <ChangePassword
        onDone={changePassword}
        revalidateError={revalidateError}
        errors={{
          confirmPasswordError,
          currentPasswordError,
          newPasswordError,
        }}
      />

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

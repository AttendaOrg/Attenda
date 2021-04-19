import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Button, IconButton } from 'react-native-paper';
import { inputContainerStyle } from '../../../../util/Styles';
import ResetPasswordImageComponent from '../../../atoms/Images/ResetPasswordImageComponent';
import PasswordShowSwitcher from '../../../atoms/PasswordShowSwitcher/PasswordShowSwitcher';
import KeyboardAdjustImageView from '../../../templates/KeyboardAdjustImageView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputStyle: {
    fontSize: 14,
    minHeight: 34,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
});

interface Errors {
  currentPasswordError: string;
  newPasswordError: string;
  confirmPasswordError: string;
}

export interface ChangePasswordPops {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  onDone: (currentPass: string, newPass: string, confirmPass: string) => void;
  errors?: Errors;
  revalidateError?: (
    currentPass: string,
    newPass: string,
    confirmPass: string,
  ) => void;
}

const ChangePassword: React.FC<ChangePasswordPops> = ({
  onDone,
  errors = {
    confirmPasswordError: '',
    currentPasswordError: '',
    newPasswordError: '',
  },
  revalidateError = () => null,
}): JSX.Element => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [hasFromTrySubmitted, setHasFromTrySubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    confirmPasswordError = '',
    currentPasswordError = '',
    newPasswordError = '',
  } = errors;

  const tryRevalidatingError = ({
    _currentPassword = currentPass,
    _newPassword = newPass,
    _confirmPassword = confirmPass,
  } = {}) => {
    if (hasFromTrySubmitted === true)
      revalidateError(_currentPassword, _newPassword, _confirmPassword);
  };

  const updateCurrentPassword = (_currentPassword: string) => {
    setCurrentPass(_currentPassword);
    tryRevalidatingError({
      _currentPassword,
    });
  };

  const updateNewPassword = (_newPassword: string) => {
    setNewPass(_newPassword);
    tryRevalidatingError({ _newPassword });
  };

  const updateConfirmPassword = (_confirmPassword: string) => {
    setConfirmPass(_confirmPassword);
    tryRevalidatingError({
      _confirmPassword,
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView svgImg={ResetPasswordImageComponent} />
      <View style={{ marginTop: 30 }} />
      <Input
        placeholder="Current Password"
        containerStyle={inputContainerStyle}
        style={styles.inputStyle}
        labelStyle={{ margin: 0 }}
        errorStyle={{ margin: 0 }}
        onChangeText={updateCurrentPassword}
        errorMessage={currentPasswordError}
        textContentType={showPassword ? 'none' : 'password'}
        secureTextEntry={!showPassword}
        rightIconContainerStyle={{
          marginHorizontal: 0,
          marginVertical: 0,
          margin: 0,
        }}
        rightIcon={
          <PasswordShowSwitcher
            show={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="New Password"
        containerStyle={inputContainerStyle}
        style={styles.inputStyle}
        onChangeText={updateNewPassword}
        errorMessage={newPasswordError}
        textContentType={showPassword ? 'none' : 'password'}
        secureTextEntry={!showPassword}
        rightIconContainerStyle={{
          marginHorizontal: 0,
          marginVertical: 0,
          margin: 0,
        }}
        rightIcon={
          <PasswordShowSwitcher
            show={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Confirm Password"
        containerStyle={inputContainerStyle}
        style={styles.inputStyle}
        onChangeText={updateConfirmPassword}
        errorMessage={confirmPasswordError}
        textContentType={showPassword ? 'none' : 'password'}
        secureTextEntry={!showPassword}
        rightIcon={() => (
          <PasswordShowSwitcher
            show={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        )}
        rightIconContainerStyle={{
          marginHorizontal: 0,
          marginVertical: 0,
          margin: 0,
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={{ width: '30%' }}
          mode="contained"
          color="#2196f3"
          onPress={() => {
            if (hasFromTrySubmitted === false) setHasFromTrySubmitted(true);
            onDone(currentPass, newPass, confirmPass);
          }}
        >
          DONE
        </Button>
      </View>
    </View>
  );
};

export default ChangePassword;

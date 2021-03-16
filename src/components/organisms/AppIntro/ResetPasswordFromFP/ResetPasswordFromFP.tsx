import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { inputContainerStyle } from '../../../../util/Styles';
import ResetPasswordImageComponent from '../../../atoms/Images/ResetPasswordImageComponent';
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
  newPasswordError: string;
  confirmPasswordError: string;
}

export interface ResetPasswordFromFPPops {
  onDone: (newPass: string, confirmPass: string) => void;
  errors?: Errors;
  revalidateError?: (newPass: string, confirmPass: string) => void;
}

const ResetPasswordFromFP: React.FC<ResetPasswordFromFPPops> = ({
  onDone,
  errors = {
    confirmPasswordError: '',
    newPasswordError: '',
  },
  revalidateError = () => null,
}): JSX.Element => {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [hasFromTrySubmitted, setHasFromTrySubmitted] = useState(false);

  const { confirmPasswordError = '', newPasswordError = '' } = errors;

  const tryRevalidatingError = ({
    _newPassword = newPass,
    _confirmPassword = confirmPass,
  } = {}) => {
    if (hasFromTrySubmitted === true)
      revalidateError(_newPassword, _confirmPassword);
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
        placeholder="New Password"
        containerStyle={inputContainerStyle}
        style={styles.inputStyle}
        onChangeText={updateNewPassword}
        errorMessage={newPasswordError}
        secureTextEntry
      />
      <Input
        placeholder="Confirm Password"
        containerStyle={inputContainerStyle}
        style={styles.inputStyle}
        onChangeText={updateConfirmPassword}
        errorMessage={confirmPasswordError}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button
          style={{ width: '30%' }}
          mode="contained"
          color="#2196f3"
          onPress={() => {
            if (hasFromTrySubmitted === false) setHasFromTrySubmitted(true);
            onDone(newPass, confirmPass);
          }}
        >
          RESET
        </Button>
      </View>
    </View>
  );
};

export default ResetPasswordFromFP;

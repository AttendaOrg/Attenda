import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { inputContainerStyle } from '../../../../util/Styles';
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSrc = require('../../../../../assets/images/changePassword.png');

export interface ChangePasswordPops {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  onDone: (currentPass: string, newPass: string, confirmPass: string) => void;
}

const ChangePassword: React.FC<ChangePasswordPops> = ({
  onDone,
}): JSX.Element => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView imageSource={imageSrc} />
      <View style={{ marginTop: 30 }} />
      <Input
        placeholder="Current Password"
        containerStyle={inputContainerStyle}
        style={styles.inputStyle}
        labelStyle={{ margin: 0 }}
        errorStyle={{ margin: 0 }}
        onChangeText={setCurrentPass}
      />
      <Input
        placeholder="New Password"
        containerStyle={inputContainerStyle}
        style={styles.inputStyle}
        onChangeText={setNewPass}
      />
      <Input
        placeholder="Confirm Password"
        containerStyle={inputContainerStyle}
        style={styles.inputStyle}
        onChangeText={setConfirmPass}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={{ width: '30%' }}
          mode="contained"
          color="#2196f3"
          onPress={() => {
            onDone(currentPass, newPass, confirmPass);
          }}
        >
          RESET
        </Button>
      </View>
    </View>
  );
};

export default ChangePassword;

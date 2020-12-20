import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
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
  currentPassword = '',
  newPassword = '',
  confirmPassword = '',
}): JSX.Element => {
  const [currentPass, setCurrentPass] = useState(currentPassword);
  const [newPass, setNewPass] = useState(newPassword);
  const [confirmPass, setConfirmPass] = useState(confirmPassword);

  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView imageSource={imageSrc} />
      {!currentPassword && (
        <Input
          placeholder="Current Password"
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          labelStyle={{ margin: 0 }}
          errorStyle={{ margin: 0 }}
          onChangeText={setCurrentPass}
        />
      )}
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
      <View style={{ alignItems: 'flex-end' }}>
        <Button
          title="DONE"
          onPress={() => {
            if (
              (currentPassword || currentPass) &&
              (newPassword || newPass) &&
              (confirmPassword || confirmPass)
            )
              onDone(
                currentPassword || currentPass,
                newPassword || newPass,
                confirmPassword || confirmPass,
              );
          }}
        />
      </View>
    </View>
  );
};

export default ChangePassword;
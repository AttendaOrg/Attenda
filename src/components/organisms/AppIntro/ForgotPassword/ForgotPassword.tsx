/* eslint-disable global-require */
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { inputContainerStyle } from '../../../../util/Styles';
import KeyboardAdjustImageView from '../../../templates/KeyboardAdjustImageView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  inputStyle: {
    fontSize: 14,
  },
});

export interface ForgotPasswordPops {
  email: string;
  onEmailChange: (email: string) => void;
  onSend: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordPops> = ({
  email,
  onEmailChange,
  onSend,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView
        imageSource={require('../../../../../assets/images/forgot_password.png')}
      />
      <View>
        <Text style={styles.textStyle}>Forgot Password ?</Text>
        <Input
          value={email}
          keyboardType="email-address"
          style={styles.inputStyle}
          onChangeText={onEmailChange}
          containerStyle={inputContainerStyle}
          placeholder="Enter Your Email Address"
        />
        <Button title="Send" onPress={onSend} />
      </View>
    </View>
  );
};

export default ForgotPassword;

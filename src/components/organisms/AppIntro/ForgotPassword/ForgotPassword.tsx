/* eslint-disable global-require */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
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
    // marginVertical: 10,
  },
  inputStyle: {
    marginTop: 20,
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'flex-end',
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
      <View style={{ marginTop: 20 }}>
        <KeyboardAdjustImageView
          imageSource={require('../../../../../assets/images/forgot_password.png')}
        />
      </View>

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
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={{ width: '40%' }}
          mode="contained"
          color="#2196f3"
          onPress={onSend}
        >
          Send
        </Button>
      </View>
    </View>
  );
};

export default ForgotPassword;

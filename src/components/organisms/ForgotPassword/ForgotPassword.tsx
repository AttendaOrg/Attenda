/* eslint-disable global-require */
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { inputContainerStyle } from '../../../util/Styles';
import KeyboardAdjustImageView from '../../templates/KeyboardAdjustImageView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  iconContainer: {
    alignItems: 'flex-start',
    // marginLeft: 10,
    marginTop: 18,
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
  onCancelClick: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordPops> = ({
  email,
  onEmailChange,
  onSend,
  onCancelClick = () => null,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          name="cancel"
          size={30}
          type="material"
          color="#67B7D1"
          onPress={() => onCancelClick()}
        />
      </View>
      <KeyboardAdjustImageView
        imageSource={require('../../../../assets/images/forgot_password.png')}
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

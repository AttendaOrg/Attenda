/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import { inputContainerStyle } from '../../../util/Styles';
import KeyboardAdjustImageView from '../../templates/KeyboardAdjustImageView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  signInContainer: {
    marginVertical: 6,
  },
  signInText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  inputStyle: {
    fontSize: 14,
    minHeight: 34,
  },
  forgotPasswordText: {
    textAlign: 'right',
    marginVertical: 8,
    marginTop: 0,
  },
  signUpText: {
    textAlign: 'center',
  },
  checkBoxStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  },
  btnContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  goBackContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});

const imageSource = require('../../../../assets/images/SignUp.png');

export interface SignUpPops {
  onSubmit: (email: string, password: string, acceptTerms: boolean) => void;
  onSignInClick: () => void;
}

const SignUp: React.FC<SignUpPops> = ({
  onSignInClick,
  onSubmit,
}): JSX.Element => {
  const [acceptTerms, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView imageSource={imageSource} />

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Sign Up</Text>
      </View>

      <View>
        <Input
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          placeholder="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          labelStyle={{ margin: 0 }}
          errorStyle={{ margin: 0 }}
          value={email}
          onChangeText={setEmail}
        />

        <Input
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <CheckBox
          checked={acceptTerms}
          title="I accept the policy and terms"
          containerStyle={styles.checkBoxStyle}
          onPress={() => setChecked(!acceptTerms)}
        />
        <View style={styles.btnContainer}>
          <Button
            title="Create account"
            onPress={() => onSubmit(email, password, acceptTerms)}
          />
        </View>
      </View>
      <View style={styles.goBackContainer}>
        <TouchableOpacity onPress={onSignInClick}>
          <Text
            style={{
              margin: 10,
              textAlign: 'center',
            }}
          >
            Already have account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

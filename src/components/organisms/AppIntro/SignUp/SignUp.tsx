/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import { inputContainerStyle } from '../../../../util/Styles';
import KeyboardAdjustImageView from '../../../templates/KeyboardAdjustImageView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  signUpContainer: {
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
  checkBoxStyle: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  },
  btnContainer: {
    // alignItems: 'flex-end',
    marginTop: 15,
  },
  goBackContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});

const imageSource = require('../../../../../assets/images/SignUp.png');

export interface SignUpPops {
  onSubmit: (email: string, password: string, acceptTerms: boolean) => void;
  onSignUpClick: () => void;
}

const SignUp: React.FC<SignUpPops> = ({
  onSignUpClick,
  onSubmit,
}): JSX.Element => {
  const [acceptTerms, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* <View style={{ marginTop: 30 }}> */}
      <KeyboardAdjustImageView imageSource={imageSource} />
      {/* </View> */}

      <View style={styles.signUpContainer}>
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
        <TouchableOpacity onPress={onSignUpClick}>
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

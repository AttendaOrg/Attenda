/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import { primaryColor } from '../../../../util/Colors';
import { inputContainerStyle } from '../../../../util/Styles';
import SignUpImageComponent from '../../../atoms/Images/SignUpImageComponent';
import PasswordShowSwitcher from '../../../atoms/PasswordShowSwitcher/PasswordShowSwitcher';
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
  signUpText: {
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
    marginTop: 15,
  },
  goBackContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  linkText: {
    color: primaryColor,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

interface Errors {
  username: string;
  email: string;
  password: string;
  acceptTerms: string;
}
export interface SignUpPops {
  onSubmit: (
    username: string,
    email: string,
    password: string,
    acceptTerms: boolean,
  ) => void;
  onSignInClick: () => void;
  onPrivacyPolicyClick: () => void;
  onTermsClick: () => void;
  revalidateError?: (
    username: string,
    email: string,
    password: string,
    acceptTerms: boolean,
  ) => void;
  errors?: Errors;
}

const SignUp: React.FC<SignUpPops> = ({
  onSignInClick,
  onSubmit,
  onPrivacyPolicyClick,
  onTermsClick,
  revalidateError = () => null,
  errors = { username: '', email: '', password: '', acceptTerms: '' },
}): JSX.Element => {
  const [hasFromTrySubmitted, setHasFromTrySubmitted] = useState(false);
  const [acceptTerms, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    username: usernameError = '',
    email: emailError = '',
    password: passwordError = '',
    acceptTerms: acceptTermsError = '',
  } = errors;

  const tryRevalidatingError = ({
    _username = username,
    _email = email,
    _password = password,
    _acceptTerms = acceptTerms,
  } = {}) => {
    if (hasFromTrySubmitted === true)
      revalidateError(_username, _email, _password, _acceptTerms);
  };

  const updateUsername = (_username: string) => {
    tryRevalidatingError({
      _username,
    });
    setUsername(_username);
  };

  const updateEmail = (_email: string) => {
    tryRevalidatingError({
      _email,
    });
    setEmail(_email);
  };

  const updatePassword = (_password: string) => {
    tryRevalidatingError({
      _password,
    });
    setPassword(_password);
  };

  const updateTerms = (_acceptTerms: boolean) => {
    tryRevalidatingError({
      _acceptTerms,
    });
    setChecked(_acceptTerms);
  };

  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView svgImg={SignUpImageComponent} />

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </View>

      <View>
        <Input
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          placeholder="Username"
          textContentType="givenName"
          keyboardType="name-phone-pad"
          labelStyle={{
            margin: 0,
          }}
          errorStyle={{
            margin: 0,
          }}
          value={username}
          onChangeText={updateUsername}
          errorMessage={usernameError}
        />

        <Input
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          placeholder="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          labelStyle={{
            margin: 0,
          }}
          errorStyle={{
            margin: 0,
          }}
          value={email}
          onChangeText={updateEmail}
          errorMessage={emailError}
        />

        <Input
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          placeholder="Password"
          labelStyle={{
            margin: 0,
          }}
          errorStyle={{
            margin: 0,
          }}
          textContentType={showPassword ? 'none' : 'password'}
          secureTextEntry={!showPassword}
          rightIcon={
            <PasswordShowSwitcher
              show={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          }
          rightIconContainerStyle={{
            marginHorizontal: 0,
            marginVertical: 0,
            margin: 0,
          }}
          value={password}
          onChangeText={updatePassword}
          errorMessage={passwordError}
        />

        <CheckBox
          checked={acceptTerms}
          containerStyle={styles.checkBoxStyle}
          onPress={() => updateTerms(!acceptTerms)}
          title={
            <View style={{ flexDirection: 'row' }}>
              <Text>I accept the</Text>
              <TouchableOpacity onPress={onPrivacyPolicyClick}>
                <Text style={styles.linkText}> privacy policy </Text>
              </TouchableOpacity>
              <Text>and</Text>
              <TouchableOpacity onPress={onTermsClick}>
                <Text style={styles.linkText}> terms of service</Text>
              </TouchableOpacity>
            </View>
          }
        />
        {acceptTermsError !== '' && (
          <Text style={styles.errorText}>{acceptTermsError}</Text>
        )}
        <View style={styles.btnContainer}>
          <Button
            title="Create account"
            onPress={() => {
              setHasFromTrySubmitted(true);
              onSubmit(username, email, password, acceptTerms);
            }}
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

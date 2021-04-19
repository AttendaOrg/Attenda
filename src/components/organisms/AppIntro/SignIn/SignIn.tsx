/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Input } from 'react-native-elements';
import { inputContainerStyle } from '../../../../util/Styles';
import DividerText from '../../../atoms/DividerText/DividerText';
import SignInImageComponent from '../../../atoms/Images/SignInImageComponent';
import PasswordShowSwitcher from '../../../atoms/PasswordShowSwitcher/PasswordShowSwitcher';
import OauthProvider, {
  OauthProviderProps,
} from '../../../molecules/OauthProvider/OauthProvider';
import KeyboardAdjustImageView from '../../../templates/KeyboardAdjustImageView';

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
  },
  goSignUpContainer: {
    justifyContent: 'flex-end',
    // flex: 1,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    paddingVertical: 8,
    paddingTop: 0,
  },
});

interface Errors {
  emailError: string;
  passwordError: string;
}

export interface SignInPops extends OauthProviderProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onForgotPasswordClick: () => void;
  onCreateNewAccountClick: () => void;
  onSignInClick: () => void;
  errors?: Errors;
}

const SignIn: React.FC<SignInPops> = ({
  email,
  onCreateNewAccountClick,
  onEmailChange,
  onFaceBookClick,
  onForgotPasswordClick,
  onGoogleClick,
  onPasswordChange,
  onTwitterClick,
  password,
  onSignInClick,
  errors = { emailError: '', passwordError: '' },
}): JSX.Element => {
  const { emailError, passwordError } = errors;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView svgImg={SignInImageComponent} heightSensitive />

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Sign In</Text>
      </View>

      <View>
        <Input
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          placeholder="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={email}
          onChangeText={onEmailChange}
          labelStyle={{
            margin: 0,
          }}
          errorStyle={{
            margin: 0,
          }}
          errorMessage={emailError}
        />
        <Input
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          placeholder="Password"
          textContentType={showPassword ? 'none' : 'password'}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={onPasswordChange}
          labelStyle={{
            margin: 0,
          }}
          errorStyle={{
            margin: 0,
          }}
          errorMessage={passwordError}
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
        />
      </View>

      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={onForgotPasswordClick}>
          <Text>forgot password ?</Text>
        </TouchableOpacity>
      </View>

      <Button title="Sign In" onPress={onSignInClick} />

      <View>
        <DividerText text="or login in with" />

        <OauthProvider
          onFaceBookClick={onFaceBookClick}
          onGoogleClick={onGoogleClick}
          onTwitterClick={onTwitterClick}
        />
      </View>
      <View style={styles.goSignUpContainer}>
        <TouchableOpacity onPress={onCreateNewAccountClick}>
          <Text
            style={{
              margin: 10,
              textAlign: 'center',
            }}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account? Create new
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 10 }} />
    </View>
  );
};

export default SignIn;

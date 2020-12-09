/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import DividerText from '../../atoms/DividerText/DividerText';
import OauthProvider, {
  OauthProviderProps,
} from '../../molecules/OauthProvider/OauthProvider';
import KeyboardAdjustImageView from '../../templates/KeyboardAdjustImageView';

// styes.inputContainerStyle does returns number not object thats why for web its gives warning
// because react-native-element expect array or object as prop type
const inputContainerStyle = { paddingHorizontal: 0, minHeight: 24 };

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
  inputContainerStyle,
  forgotPasswordText: {
    textAlign: 'right',
    marginVertical: 8,
    marginTop: 0,
  },
  signUpText: {
    textAlign: 'center',
  },
});

const imageSource = require('../../../../assets/images/signin.png');

export interface SignInPops extends OauthProviderProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onForgotPasswordClick: () => void;
  onCreateNewAccountClick: () => void;
  onSignInClick: () => void;
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
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView imageSource={imageSource} />

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Sign In</Text>
      </View>

      <View>
        <Input
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          placeholder="Email"
          textContentType="emailAddress"
          value={email}
          onChangeText={onEmailChange}
          labelStyle={{ margin: 0 }}
          errorStyle={{ margin: 0 }}
        />
        <Input
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          value={password}
          onChangeText={onPasswordChange}
        />
      </View>

      <TouchableOpacity onPress={onForgotPasswordClick}>
        <Text style={styles.forgotPasswordText}>forgot password ?</Text>
      </TouchableOpacity>

      <Button title="Sign In" onPress={onSignInClick} />

      <View>
        <DividerText text="or login in with" />

        <OauthProvider
          onFaceBookClick={onFaceBookClick}
          onGoogleClick={onGoogleClick}
          onTwitterClick={onTwitterClick}
        />

        <TouchableOpacity onPress={onCreateNewAccountClick}>
          <Text style={styles.signUpText}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account? Create new
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

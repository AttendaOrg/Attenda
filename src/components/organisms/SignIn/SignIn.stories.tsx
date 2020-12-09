import React from 'react';
import { Platform } from 'react-native';
import { text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import SignIn from './SignIn';

const STORY_NAME = 'Organisms/SignIn';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: SignIn,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <SignIn
    password={text('password', 'password')}
    email={text('email', 'test@domail.com')}
    onEmailChange={() => action('onEmailChange')()}
    onPasswordChange={() => action('onPasswordChange')()}
    onGoogleClick={() => action('onGoogleClick')()}
    onTwitterClick={() => action('onTwitterClick')()}
    onFaceBookClick={() => action('onFaceBookClick')()}
    onSignInClick={() => action('onSignInClick')()}
    onCreateNewAccountClick={() => action('onCreateNewAccountClick')()}
    onForgotPasswordClick={() => action('onForgotPasswordClick')()}
  />
);

// if the platform is not web only then render it
// otherwise it will render 2 story in web storybook
// it is the storybook legacy api react-native does not support modern api
if (Platform.OS !== 'web') {
  storiesOf(STORY_NAME, module)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addDecorator((getStory: any) => <>{getStory()}</>)
    .addDecorator(withKnobs)
    .add('Default', Default);
}

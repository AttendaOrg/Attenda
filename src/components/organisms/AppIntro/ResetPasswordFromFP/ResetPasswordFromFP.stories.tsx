import React from 'react';
import { Platform } from 'react-native';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import ResetPasswordFromFP from './ResetPasswordFromFP';

const STORY_NAME = 'Organisms/AppIntro/ResetPasswordFromFP';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: ResetPasswordFromFP,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <ResetPasswordFromFP
    newPassword={text('newPassword', '')}
    confirmPassword={text('confirmPassword', '')}
    onDone={(newPass, confirmPass) => action('onDone')(newPass, confirmPass)}
  />
);

// if the platform is not web only then render it
// otherwise it will render 2 story in web storybook
// it is the storybook legacy api react-native does not support modern api
if (Platform.OS !== 'web') {
  storiesOf(STORY_NAME, module)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addDecorator((getStory: any) => (
      <CenterView onlySafeView>{getStory()}</CenterView>
    ))
    .addDecorator(withKnobs)
    .add('Default', Default);
}

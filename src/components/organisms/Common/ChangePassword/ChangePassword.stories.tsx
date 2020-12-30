import React from 'react';
import { Platform } from 'react-native';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import ChangePassword from './ChangePassword';

const STORY_NAME = 'Organisms/common/ChangePassword';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: ChangePassword,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <ChangePassword
    currentPassword={text('CurrentPassword', '')}
    newPassword={text('newPassword', '')}
    confirmPassword={text('confirmPassword', '')}
    onDone={(currentPass, newPass, confirmPass) =>
      action('onDone')(currentPass, newPass, confirmPass)
    }
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

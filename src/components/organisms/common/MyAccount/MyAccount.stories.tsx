import React from 'react';
import { Platform } from 'react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import MyAccount from './MyAccount';

const STORY_NAME = 'Organisms/common/MyAccount';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: MyAccount,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <MyAccount
    username="Aditiya jhv"
    email="adi@gmail.com"
    // eslint-disable-next-line jsx-a11y/aria-role
    role="student"
    onEditUsernameClick={() => action('onEditUsernameClick')}
    onChangePasswordClick={() => action('onChangePasswordClick')}
    onLogOutClick={() => action('onLogOutClick')}
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

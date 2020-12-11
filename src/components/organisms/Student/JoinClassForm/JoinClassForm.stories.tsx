import React from 'react';
import { Platform } from 'react-native';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import JoinClassForm from './JoinClassForm';

const STORY_NAME = 'Organisms/Student/JoinClassForm';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: JoinClassForm,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <JoinClassForm
    joinCode={text('JoinCode', '')}
    onSubmit={(classCode, rollNo) => action('onSubmit')(classCode, rollNo)}
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
    .add('Default', Default)
    .add('With Join Code', () => (
      <JoinClassForm
        joinCode={text('JoinCode', 'JOIN_CLASS')}
        onSubmit={(classCode, rollNo) => action('onSubmit')(classCode, rollNo)}
      />
    ));
}

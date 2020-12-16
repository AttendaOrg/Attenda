import React from 'react';
import { Platform } from 'react-native';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../atoms/CenterView';
import UserPresentPopup from './UserPresentPopup';

const STORY_NAME = 'Molecules/UserPresentPopup';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: UserPresentPopup,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <UserPresentPopup
    date={text('date', '2020-12-12')}
    selectedDates={object('selectedDates', {
      '03:50 AM': false,
      '10:50 AM': true,
    })}
  />
);

// if the platform is not web only then render it
// otherwise it will render 2 story in web storybook
// it is the storybook legacy api react-native does not support modern api
if (Platform.OS !== 'web') {
  storiesOf(STORY_NAME, module)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
    .addDecorator(withKnobs)
    .add('Default', Default);
}

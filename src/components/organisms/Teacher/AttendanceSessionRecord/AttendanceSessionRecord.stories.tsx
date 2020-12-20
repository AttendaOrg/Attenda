import React from 'react';
import { Platform } from 'react-native';
import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import AttendanceSessionRecord from './AttendanceSessionRecord';

const STORY_NAME = 'Organisms/Teacher/AttendanceSessionRecord';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: AttendanceSessionRecord,
};

// Default For Web And android Component
export const Default = (): JSX.Element => {
  const markedDates = {
    '2020-12-12': {
      '03:50 AM': false,
      '10:50 AM': true,
    },
    '2020-12-11': {
      '03:50 AM': true,
      '10:50 AM': true,
    },
  };

  return (
    <AttendanceSessionRecord
      onTimeSelect={(date, time) => action('onTimeSelect')(date, time)}
      onMonthChange={date => action('onMonthChange')(date)}
      markedDates={object('markedDates', markedDates)}
    />
  );
};

// if the platform is not web only then render it
// otherwise it will render 2 story in web storybook
// it is the storybook legacy api react-native does not support modern api
if (Platform.OS !== 'web') {
  storiesOf(STORY_NAME, module)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addDecorator((getStory: any) => (
      <CenterView noPadding>{getStory()}</CenterView>
    ))
    .addDecorator(withKnobs)
    .add('Default', Default);
}
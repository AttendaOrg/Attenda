import React from 'react';
import { Platform } from 'react-native';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import AttendanceRecord from './AttendanceRecord';

const STORY_NAME = 'Organisms/Student/AttendanceRecord';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: AttendanceRecord,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <AttendanceRecord
    teacherName={text('teacherName', 'Aditya Bhargava')}
    className={text(
      'className',
      'Computer science data structures and algorithms',
    )}
    section={text('section', 'CED/COE')}
    rollNo={text('rollNo', 'IITE1557454F')}
    onMonthChange={date => action('onMonthChange')(date)}
    percentage={text('percentage', '95%')}
    markedDates={object('markedDates', {
      '2020-12-12': {
        '03:50 AM': { active: false, sessionId: 'g67fg243g7' },
        '10:50 AM': { active: true, sessionId: 'f35gh04093' },
      },
      '2020-12-11': {
        '03:50 AM': { active: true, sessionId: 'f834hf843' },
        '10:50 AM': { active: true, sessionId: 'f94f03h4' },
      },
    })}
  />
);

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

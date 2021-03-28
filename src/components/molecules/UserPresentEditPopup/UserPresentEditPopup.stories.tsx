import React from 'react';
import { Platform } from 'react-native';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../atoms/CenterView';
import UserPresentEditPopup from './UserPresentEditPopup';
import { MarkTime } from '../../organisms/Student/AttendanceRecord';

const STORY_NAME = 'Molecules/UserPresentEditPopup';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: UserPresentEditPopup,
};

const selectedDates: MarkTime[] = [
  { '03:02 AM': { active: true, sessionId: '984gh89' } },
  { '12:02 PM': { active: false, sessionId: '984gh89' } },
];

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <UserPresentEditPopup
    date={text('date', '2020-12-12')}
    selectedDates={object('selectedDates', selectedDates)}
    onChangeAttendance={(sessionId, status) =>
      action('changeAttendance')(sessionId, status)
    }
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

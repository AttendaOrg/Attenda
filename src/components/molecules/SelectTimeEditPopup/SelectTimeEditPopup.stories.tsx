import React from 'react';
import { Platform } from 'react-native';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../atoms/CenterView';
import SelectTimeEditPopup from './SelectTimeEditPopup';
import { MarkTime } from '../../organisms/Student/AttendanceRecord';

const STORY_NAME = 'Molecules/SelectTimeEditPopup';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: SelectTimeEditPopup,
};

const selectedDateTimes: MarkTime[] = [
  { '03:50 AM': { active: true, sessionId: 'asmd' } },
];

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <SelectTimeEditPopup
    date={text('date', '2020-12-12')}
    selectedDateTimes={object<MarkTime[]>('selectedDates', selectedDateTimes)}
    onSelectTime={sessionId => action('changeAttendance')(sessionId)}
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

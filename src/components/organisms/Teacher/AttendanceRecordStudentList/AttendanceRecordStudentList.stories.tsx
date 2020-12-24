import React from 'react';
import { Platform } from 'react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../atoms/CenterView';
import AttendanceRecordStudentList from './AttendanceRecordStudentList';
import { StudentListData } from '../StudentList';

const STORY_NAME = 'Organisms/Teacher/AttendanceRecordStudentList';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: AttendanceRecordStudentList,
};

const globalListItems: StudentListData[] = [
  {
    name: 'Prasanta Barman',
    rollNo: 'IIT2154',
    key: 'IIT2154',
    checked: false,
    percentage: '90%',
  },
  {
    name: 'Apurba Roy',
    rollNo: 'IIT2441454',
    key: 'IIT2441454',
    checked: false,
    percentage: '95%',
  },
];

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <AttendanceRecordStudentList studentList={globalListItems} />
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

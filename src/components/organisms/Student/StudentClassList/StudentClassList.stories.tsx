/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Platform } from 'react-native';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import StudentClassList, { StudentListDataProps } from './StudentClassList';

const STORY_NAME = 'Organisms/Student/StudentClassList';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: StudentClassList,
};

const classBack1 = require('../../../../../assets/images/class-back-1.jpg');
const classBack2 = require('../../../../../assets/images/class-back-2.jpg');
const classBack3 = require('../../../../../assets/images/class-back-3.jpg');
const classBack4 = require('../../../../../assets/images/class-back-4.jpg');
const classBack5 = require('../../../../../assets/images/class-back-5.jpg');

export const dummyStudentClassListData: StudentListDataProps[] = [
  {
    attendance: 'Your Attendance: 92%',
    backgroundImage: classBack1,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Teacher Name',
    isSessionLive: true,
    key: 'key1',
  },
  {
    attendance: 'Your Attendance: 99%',
    backgroundImage: classBack2,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Teacher Name',
    isSessionLive: false,
    key: 'key2',
  },
  {
    attendance: 'Your Attendance: 99%',
    backgroundImage: classBack3,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Teacher Name',
    isSessionLive: false,
    key: 'key3',
  },
  {
    attendance: 'Your Attendance: 99%',
    backgroundImage: classBack4,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Teacher Name',
    isSessionLive: false,
    key: 'key4',
  },
  {
    attendance: 'Your Attendance: 99%',
    backgroundImage: classBack5,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Teacher Name',
    isSessionLive: false,
    key: 'key5',
  },
];

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <StudentClassList
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data={select<StudentListDataProps[]>(
      'data',
      { 'No Data': [], 'With Data': dummyStudentClassListData },
      [],
    )}
    onFabClick={() => action('onFabClick')()}
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

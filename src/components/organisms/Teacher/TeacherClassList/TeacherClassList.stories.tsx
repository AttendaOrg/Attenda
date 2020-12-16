/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Platform } from 'react-native';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import TeacherClassList from './TeacherClassList';
import { StudentListDataProps } from '../../Student/StudentClassList';

const STORY_NAME = 'TeacherClassList';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: TeacherClassList,
};

const classBack1 = require('../../../../../assets/images/class-back-1.jpg');
const classBack2 = require('../../../../../assets/images/class-back-2.jpg');
const classBack3 = require('../../../../../assets/images/class-back-3.jpg');
const classBack4 = require('../../../../../assets/images/class-back-4.jpg');
const classBack5 = require('../../../../../assets/images/class-back-5.jpg');

export const dummyTeacherClassListData: StudentListDataProps[] = [
  {
    attendance: '92 Students',
    backgroundImage: classBack1,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: true,
    key: 'key1',
  },
  {
    attendance: '99 Students',
    backgroundImage: classBack2,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: false,
    key: 'key2',
  },
  {
    attendance: '99 Students',
    backgroundImage: classBack3,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: false,
    key: 'key3',
  },
  {
    attendance: '99 Students',
    backgroundImage: classBack4,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: false,
    key: 'key4',
  },
  {
    attendance: '99 Students',
    backgroundImage: classBack5,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Class Code: SD4584558',
    isSessionLive: false,
    key: 'key5',
  },
];

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <TeacherClassList
    onClassClick={classId => action('onClassClick')(classId)}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data={select<StudentListDataProps[]>(
      'data',
      { 'No Data': [], 'With Data': dummyTeacherClassListData },
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
      <CenterView noPadding>{getStory()}</CenterView>
    ))
    .addDecorator(withKnobs)
    .add('Default', Default);
}

/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Platform } from 'react-native';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import TeacherClassList from './TeacherClassList';
import { StudentListDataProps } from '../../Student/StudentClassList';
import { dummyTeacherClassListData } from '.';

const STORY_NAME = 'Organisms/Teacher/TeacherClassList';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: TeacherClassList,
};

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

// Default For Web And android Component
export const WithData = (): JSX.Element => (
  <TeacherClassList
    onClassClick={classId => action('onClassClick')(classId)}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data={dummyTeacherClassListData}
    onAction={(a, i) => action('onAction')(a, i)}
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
    .add('Default', Default)
    .add('WithData', WithData);
}

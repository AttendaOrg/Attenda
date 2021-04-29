import React from 'react';
import { Platform } from 'react-native';
import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../atoms/CenterView';
import JoinClass from './JoinClass';
import TeacherClassModel from '../../../../api/TeacherApi/model/TeacherClassModel';

const STORY_NAME = 'JoinClass';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: JoinClass,
};

const validClassObj = new TeacherClassModel({
  section: 'section',
  teacherId: 'teacherId',
  title: 'title',
  alreadyGiven: false,
  classCode: 'classCode',
  classIcon: '',
  classId: 'classId',
  currentSessionId: null,
  description: 'description',
  inviteLink: 'inviteLink',
  isActiveInvite: true,
  isArchived: false,
  isLive: false,
  teacherName: 'Teacher Name',
  totalStudent: 10,
});

const selectValues: { [key: string]: any } = {
  null: (null as unknown) as TeacherClassModel,
  validClassObj,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <JoinClass
    noClassFound={boolean('noClassFound', false)}
    resetNoClassFound={() => action('resetNoClassFound')()}
    onJoinClass={roll => action('onJoinClass')(roll)}
    onGetClassCode={code => action('onGetClassCode')(code)}
    classInfo={select('classInfo', selectValues, validClassObj)}
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

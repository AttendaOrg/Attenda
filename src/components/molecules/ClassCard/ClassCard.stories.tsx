/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Platform } from 'react-native';
import { boolean, text, withKnobs, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../atoms/CenterView';
import ClassCard from './ClassCard';

const classBack1 = require('../../../../assets/images/class-back-1.jpg');
const classBack2 = require('../../../../assets/images/class-back-2.jpg');
const classBack3 = require('../../../../assets/images/class-back-3.jpg');
const classBack4 = require('../../../../assets/images/class-back-4.jpg');
const classBack5 = require('../../../../assets/images/class-back-5.jpg');

const listOfImages = {
  classBack1,
  classBack2,
  classBack3,
  classBack4,
  classBack5,
};

const STORY_NAME = 'Molecules/ClassCard';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: ClassCard,
};

// Default For Web And android Component
text('className', 'Class Name');
export const Default = (): JSX.Element => (
  <ClassCard
    className={text('ClassName', 'Class Name')}
    section={text('section', 'Section')}
    teacherName={text('teacherName', 'Teacher Name')}
    attendance={text('attendance', 'Your Attendance: 92%')}
    isSessionLive={boolean('isSessionLive', true)}
    onCardClick={() => action('onCardClick')()}
    onMoreIconClick={() => action('onMoreIconClick')()}
    backgroundImage={select('image', listOfImages, listOfImages.classBack1)}
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

import React from 'react';
import { Platform } from 'react-native';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../atoms/CenterView';
import StudentListItem from './StudentListItem';

const STORY_NAME = 'Molecules/StudentListItem';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: StudentListItem,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <StudentListItem
    name={text('name', 'Prasanta Barman')}
    rollNo={text('rollNo', 'IIT15454')}
    checked={boolean('checked', false)}
    showChecked={boolean('showChecked', true)}
    onChangeChecked={(active: boolean) => action('onChangeChecked')(active)}
    onLogPress={() => action('onLogPress')()}
    onProfileClick={() => action('onProfileClick')()}
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

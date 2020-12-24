import React from 'react';
import { Platform } from 'react-native';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../atoms/CenterView';
import StudentPresentListItem from './StudentPresentListItem';

const STORY_NAME = 'Molecules/StudentPresentListItem';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: StudentPresentListItem,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <StudentPresentListItem
    name={text('name', 'Prasanta Barman')}
    rollNo={text('rollNo', 'ITI-1545445')}
    onPresentChange={(present: boolean) => action('onPresentChange')(present)}
    present={boolean('present', true)}
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

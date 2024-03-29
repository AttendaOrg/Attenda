import React from 'react';
import { Platform } from 'react-native';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import SpinnerLoader from './SpinnerLoader';
import CenterView from '../../atoms/CenterView';

const STORY_NAME = 'Molecules/SpinnerLoader';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: SpinnerLoader,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <SpinnerLoader show={boolean('show', true)} />
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

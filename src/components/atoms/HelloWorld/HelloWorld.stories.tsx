import React from 'react';
import { Button, Platform } from 'react-native';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import HelloWorld from './HelloWorld';
import CenterView from '../CenterView';

const STORY_NAME = 'HelloWorld';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: HelloWorld,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <HelloWorld text={text('Text', 'Hello World')} />
);

export const WithButton = (): JSX.Element => (
  <>
    <Default />
    <Button title="Click Me" onPress={action('Clicked!')} />
  </>
);

// if the platform is not web only then render it
// otherwise it will render 2 story in web storybook
// it is the storybook legacy api react-native does not support modern api
if (Platform.OS !== 'web') {
  storiesOf(STORY_NAME, module)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
    .addDecorator(withKnobs)
    .add('Default', Default)
    .add('WithButton', WithButton);
}

import React from 'react';
import { Platform } from 'react-native';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../atoms/CenterView';
import ImagePopup from './ImagePopup';
import TurnOnWifiImageComponent from '../../atoms/Images/TurnOnWifiImageComponent';

const STORY_NAME = 'Molecules/ImagePopup';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: ImagePopup,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <ImagePopup
    visible={boolean('visible', true)}
    imageComponent={TurnOnWifiImageComponent}
    title="Wifi is off"
    text="Please turn on wifi."
    onDismiss={() => action('onDismiss')()}
    onCancelClick={() => action('onCancelClick')()}
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

import React from 'react';
import { Platform } from 'react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../atoms/CenterView';
import ChooseClassIcon from './ChooseClassIcon';

const STORY_NAME = 'Organisms/Teacher/ChooseClassIcon';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: ChooseClassIcon,
};

// Default For Web And android Component
export const Default = (): JSX.Element => <ChooseClassIcon />;

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

import React from 'react';
import { Platform } from 'react-native';
import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../atoms/CenterView';
import ChangeClassCode, { InfoTextType } from './ChangeClassCode';

const STORY_NAME = 'Organisms/Teacher/ChangeClassCode';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: ChangeClassCode,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <ChangeClassCode
    showDialog={boolean('showDialog', true)}
    showSpinner={boolean('showSpinner', true)}
    initialClassCode={text('initialClassCode', 'ClassCode')}
    onClassCodeChange={(newText: string) =>
      action('onClassCodeChange')(newText)
    }
    infoText={text('infoText', 'infoText')}
    infoType={select(
      'infoText',
      [InfoTextType.ERROR, InfoTextType.SUCCESS],
      InfoTextType.SUCCESS,
    )}
    onDismissDialog={() => action('onDismissDialog')()}
    onSaveClassCode={() => action('onDismissDialog')()}
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

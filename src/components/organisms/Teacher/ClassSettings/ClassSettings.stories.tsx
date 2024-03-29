import React from 'react';
import { Platform } from 'react-native';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import ClassSettings from './ClassSettings';

const STORY_NAME = 'Organisms/Teacher/ClassSettings';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: ClassSettings,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <ClassSettings
    title={text('title', '')}
    section={text('section', '')}
    description={text('description', '')}
    isShareOptionEnabled={boolean('isShareOptionEnabled', false)}
    code={text('code', '')}
    link={text('link', '')}
    onTitleChange={(title: string) => action('onTitleChange')(title)}
    onSectionChange={(section: string) => action('onSectionChange')(section)}
    onDescriptionChange={(description: string) =>
      action('onDescriptionChange')(description)
    }
    toggleShareSwitch={(isShareOptionEnabled: boolean) =>
      action('toggleShareSwitch')(isShareOptionEnabled)
    }
    onCodeShare={() => action('onCodeShare')()}
    onLinkShare={() => action('onLinkShare')()}
    onEditClassCodeClick={() => action('onEditClassCodeClick')()}
    sectionErrorMsg={text('sectionErrorMsg', 'sectionErrorMsg')}
    titleErrorMsg={text('titleErrorMsg', 'titleErrorMsg')}
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

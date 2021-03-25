import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { boolean, withKnobs, color } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../CenterView';
import ColoredCircle from './ColoredCircle';

const STORY_NAME = 'Atoms/ColoredCircle';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: ColoredCircle,
};

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <ColoredCircle
    color={color('color', 'red')}
    borderColor={color('borderColor', 'white')}
    isSelected={boolean('isSelected', true)}
    onSelect={() => action('onSelect')()}
  />
);

enum Selected {
  ONE,
  TWO,
  THREE,
}

export const Multiple = (): JSX.Element => {
  const [selected, setSelected] = useState<Selected>(Selected.ONE);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <ColoredCircle
        color="red"
        isSelected={selected === Selected.ONE}
        borderColor="gray"
        onSelect={() => {
          action('onSelect')();
          setSelected(Selected.ONE);
        }}
      />
      <ColoredCircle
        isSelected={selected === Selected.TWO}
        color="green"
        borderColor="gray"
        onSelect={() => {
          action('onSelect')();
          setSelected(Selected.TWO);
        }}
      />
      <ColoredCircle
        isSelected={selected === Selected.THREE}
        color="blue"
        borderColor="gray"
        onSelect={() => {
          action('onSelect')();
          setSelected(Selected.THREE);
        }}
      />
      <ColoredCircle
        isSelected={selected === Selected.THREE}
        color="blue"
        borderColor="gray"
        onSelect={() => {
          action('onSelect')();
          setSelected(Selected.THREE);
        }}
      />
      <ColoredCircle
        isSelected={selected === Selected.THREE}
        color="blue"
        borderColor="gray"
        onSelect={() => {
          action('onSelect')();
          setSelected(Selected.THREE);
        }}
      />
      <ColoredCircle
        isSelected={selected === Selected.THREE}
        color="blue"
        borderColor="gray"
        onSelect={() => {
          action('onSelect')();
          setSelected(Selected.THREE);
        }}
      />
      <ColoredCircle
        isSelected={selected === Selected.THREE}
        color="blue"
        borderColor="gray"
        onSelect={() => {
          action('onSelect')();
          setSelected(Selected.THREE);
        }}
      />
    </View>
  );
};

// if the platform is not web only then render it
// otherwise it will render 2 story in web storybook
// it is the storybook legacy api react-native does not support modern api
if (Platform.OS !== 'web') {
  storiesOf(STORY_NAME, module)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
    .addDecorator(withKnobs)
    .add('Default', Default)
    .add('Multiple', () => <Multiple />);
}

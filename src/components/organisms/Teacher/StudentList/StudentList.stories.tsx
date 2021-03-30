import React, { useState } from 'react';
import { Platform } from 'react-native';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import StudentList, { StudentListData } from './StudentList';

const STORY_NAME = 'Organisms/Teacher/StudentList';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: StudentList,
};

const globalListItems: StudentListData[] = [
  {
    name: 'Prasanta Barman',
    rollNo: 'IIT2154',
    key: 'IIT2154',
    checked: false,
  },
  {
    name: 'Apurba Roy',
    rollNo: 'IIT2441454',
    key: 'IIT2441454',
    checked: false,
  },
];

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <StudentList
    showShimmer={boolean('showShimmer', false)}
    preloadStudentCount={number('preloadStudentCount', 0)}
    studentList={globalListItems}
    showChecked={boolean('showChecked', false)}
    onChangeShowChecked={active => action('onChangeShowChecked')(active)}
    onChangeChecked={(rollNo, checked) =>
      action('onChangeChecked')(rollNo, checked)
    }
    onProfileClick={rollNo => action('onProfileClick')(rollNo)}
  />
);

export const Functional = (): JSX.Element => {
  const [showChecked, setShowChecked] = useState(false);
  const [listItems, setListItems] = useState<StudentListData[]>(
    globalListItems,
  );

  const onChangeChecked = (rollNo: string, checked: boolean) => {
    const newListItems = [
      ...listItems.map(item =>
        item.rollNo === rollNo ? { ...item, checked } : item,
      ),
    ];

    setListItems(newListItems);
    const matched = newListItems.filter(item => item.checked === true);

    if (matched.length > 0) setShowChecked(true);
    else setShowChecked(false);
  };

  return (
    <StudentList
      studentList={listItems}
      showChecked={showChecked}
      onChangeShowChecked={setShowChecked}
      onChangeChecked={onChangeChecked}
      onProfileClick={rollNo => action('onProfileClick')(rollNo)}
    />
  );
};

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
    .add('Default', Default)
    .add('Functional', () => <Functional />);
}

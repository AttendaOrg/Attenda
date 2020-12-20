import React, { useState } from 'react';
import { Platform } from 'react-native';
import { object, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import EditAttendanceSession, {
  SessionStudentListDataProps,
} from './EditAttendanceSession';

const STORY_NAME = 'Organisms/Teacher/EditAttendanceSession';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: EditAttendanceSession,
};

const globalListItems: SessionStudentListDataProps[] = [
  {
    name: 'Prasanta Barman',
    rollNo: 'IIT2154',
    key: 'IIT2154',
    present: false,
  },
  {
    name: 'Apurba Roy',
    rollNo: 'IIT2441454',
    key: 'IIT2441454',
    present: false,
  },
];

// Default For Web And android Component
export const Default = (): JSX.Element => (
  <EditAttendanceSession
    studentList={object('studentList', globalListItems)}
    onPresentChange={async (rollNo: string, present: boolean) =>
      action('onPresentChange')(rollNo, present)
    }
  />
);

const Functional = (): JSX.Element => {
  const [listItems, setListItems] = useState<SessionStudentListDataProps[]>([
    {
      name: 'Prasanta Barman',
      rollNo: 'IIT2154',
      key: 'IIT2154',
      present: false,
    },
    {
      name: 'Apurba Roy',
      rollNo: 'IIT2441454',
      key: 'IIT2441454',
      present: false,
    },
  ]);

  const onPresentChange = async (rollNo: string, _present: boolean) => {
    const newList = listItems.map(item =>
      item.rollNo === rollNo ? { ...item, present: _present } : item,
    );

    setListItems(newList);
  };

  return (
    <EditAttendanceSession
      studentList={listItems}
      onPresentChange={onPresentChange}
    />
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
    .add('Functional', () => <Functional />);
}

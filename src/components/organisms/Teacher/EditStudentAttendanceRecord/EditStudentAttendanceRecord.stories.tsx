import React, { useState } from 'react';
import { Platform } from 'react-native';
import { object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import CenterView from '../../../atoms/CenterView';
import EditStudentAttendanceRecord from './EditStudentAttendanceRecord';
import { MarkedDates } from '../../Student/AttendanceRecord';
import { UserInfoPops } from '../../../molecules/UserInfo';

const STORY_NAME = 'Organisms/Teacher/EditStudentAttendanceRecord';

// it will only work with web
// because react native does not supports the modern api
export default {
  title: STORY_NAME,
  decorators: [withKnobs],
  component: EditStudentAttendanceRecord,
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSrc = require('../../../../../assets/images/study.png');

// Default For Web And android Component
export const Default = (): JSX.Element => {
  const markedDates = {
    '2020-12-12': {
      '03:50 AM': false,
      '10:50 AM': true,
    },
    '2020-12-11': {
      '03:50 AM': true,
      '10:50 AM': true,
    },
  };

  return (
    <EditStudentAttendanceRecord
      userInfo={object('userInfo', {
        name: 'Prasanta Barman',
        onRollChange: async (rollNo): Promise<void> =>
          action('onRollChange')(rollNo),
        rollNo: 'IITE1557454',
        userImage: imageSrc,
      })}
      onChangeAttendance={async (date, time, status) =>
        action('onChangeAttendance')(date, time, status)
      }
      onMonthChange={date => action('onMonthChange')(date)}
      percentage={text('percentage', '95%')}
      markedDates={object('markedDates', markedDates)}
    />
  );
};

const WorkingPrototype = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<UserInfoPops>({
    name: 'Prasanta Barman',
    onRollChange: async (rollNo: string): Promise<void> =>
      setUserInfo({ ...userInfo, rollNo }),
    rollNo: 'IITE1557454',
    userImage: imageSrc,
  });

  const [markedDates, setMarkedDates] = useState<MarkedDates>({
    '2020-12-12': {
      '03:50 AM': false,
      '10:50 AM': true,
    },
    '2020-12-11': {
      '03:50 AM': true,
      '10:50 AM': true,
    },
  });

  const onChangeAttendance = async (
    date: string,
    time: string,
    status: boolean,
  ) => {
    const newMarkedDate = { ...markedDates };

    newMarkedDate[date][time] = status;

    setMarkedDates(newMarkedDate);
  };

  return (
    <EditStudentAttendanceRecord
      userInfo={userInfo}
      onChangeAttendance={onChangeAttendance}
      onMonthChange={date => action('onMonthChange')(date)}
      percentage={text('percentage', '95%')}
      markedDates={object('markedDates', markedDates)}
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
    .add('WorkingPrototype', () => <WorkingPrototype />);
}

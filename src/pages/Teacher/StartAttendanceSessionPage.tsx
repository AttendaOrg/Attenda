import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import StartAttendanceSession from '../../components/organisms/Teacher/StartAttendanceSession';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'StartAttendanceSession'>;

export const StartAttendanceSessionNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Start Attendance',
};

const StartAttendanceSessionPage: React.FC<Props> = ({
  navigation,
}): JSX.Element => {
  return (
    <StartAttendanceSession
      title="Computer science data structures and algorithms"
      onStartSession={() =>
        navigation.replace('CurrentAttendanceSession', {
          classId: '',
          showStopDialog: false,
        })
      }
    />
  );
};

export default StartAttendanceSessionPage;

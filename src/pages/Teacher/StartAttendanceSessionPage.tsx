import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import StartAttendanceSession from '../../components/organisms/Teacher/StartAttendanceSession';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';

type Props = StackScreenProps<RootStackParamList, 'StartAttendanceSession'>;

export const StartAttendanceSessionNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Start Attendance',
};

const StartAttendanceSessionPage: React.FC<Props> = ({
  navigation,
  route: {
    params: { classId, title },
  },
}): JSX.Element => {
  const onStartSession = async (date: Date) => {
    const [sessionId] = await teacherApi.startClassSession(
      classId,
      'macId',
      date,
    );

    navigation.push('CurrentAttendanceSession', {
      classId,
      sessionId: sessionId ?? '',
      showStopDialog: false,
      sessionTime: date.toISOString(),
    });
  };

  return (
    <StartAttendanceSession title={title} onStartSession={onStartSession} />
  );
};

export default StartAttendanceSessionPage;

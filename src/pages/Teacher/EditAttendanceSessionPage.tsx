import React, { useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import EditAttendanceSession, {
  SessionStudentListDataProps,
} from '../../components/organisms/Teacher/EditAttendanceSession';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';
import SessionStudentModel from '../../api/TeacherApi/model/SessionStudentModel';

type Props = StackScreenProps<RootStackParamList, 'EditAttendanceSession'>;

export const EditAttendanceSessionNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Attendance record',
};

const transform = (data: SessionStudentModel): SessionStudentListDataProps => ({
  key: data.studentId,
  name: data.studentName ?? '',
  present: data.present,
  rollNo: 'rollNo', // TODO: do we really need roll no
});

const EditAttendanceSessionPage: React.FC<Props> = ({ route }): JSX.Element => {
  const [listItems, setListItems] = useState<SessionStudentListDataProps[]>([]);
  const {
    params: { classId, sessionId },
  } = route;

  useEffect(() => {
    (async () => {
      const [lists] = await teacherApi.getSessionAttendanceReport(
        classId,
        sessionId,
      );

      if (lists !== null) setListItems(lists.map(transform));

      const unSubscribe = teacherApi.getLiveStudentAttendance(
        sessionId,
        sessions => {
          const Sessions = sessions.map(transform);

          setListItems(Sessions);
        },
      );

      return unSubscribe;
    })();
  }, [classId, sessionId]);

  const onPresentChange = async (studentId: string, present: boolean) => {
    await teacherApi.editStudentAttendanceReport(
      classId,
      sessionId,
      studentId,
      present,
    );
  };

  return (
    <EditAttendanceSession
      studentList={listItems}
      onPresentChange={onPresentChange}
    />
  );
};

export default EditAttendanceSessionPage;

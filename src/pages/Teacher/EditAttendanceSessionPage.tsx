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
import ClassStudentModel from '../../api/TeacherApi/model/ClassStudentModel';
import { CurrentAttendanceSessionDataProps } from '../../components/organisms/Teacher/CurrentAttendanceSession';

type Props = StackScreenProps<RootStackParamList, 'EditAttendanceSession'>;

export const EditAttendanceSessionNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Attendance record',
};

const transformClassStudentModelToDataProps = (
  data: ClassStudentModel,
  present = false,
): SessionStudentListDataProps => ({
  key: data.studentId ?? '',
  name: data.studentName ?? '',
  present,
  rollNo: data.rollNo, // TODO: do we really need roll no
});

const findSessionByStudentId = (
  sessions: SessionStudentModel[],
  studentId: string,
): SessionStudentModel | null => {
  const found = sessions.filter(session => session.studentId === studentId);

  if (found.length === 0) return null;

  return found[0];
};

const mergeStudentListWithAttendanceInfo = (
  students: ClassStudentModel[],
  sessions: SessionStudentModel[] = [],
): SessionStudentListDataProps[] => {
  // loop through all student registered in a class

  return students.map<CurrentAttendanceSessionDataProps>(student => {
    const found: SessionStudentModel | null = findSessionByStudentId(
      sessions,
      student.studentId ?? '',
    );

    if (found === null) return transformClassStudentModelToDataProps(student);

    return transformClassStudentModelToDataProps(student, found.present);
  });
};

const EditAttendanceSessionPage: React.FC<Props> = ({ route }): JSX.Element => {
  const [listItems, setListItems] = useState<SessionStudentListDataProps[]>([]);
  const {
    params: { classId, sessionId },
  } = route;

  useEffect(() => {
    (async () => {
      const [listsOfAllJoinedStudents] = await teacherApi.getAllStudentList(
        classId,
      );

      if (listsOfAllJoinedStudents !== null) {
        setListItems(
          listsOfAllJoinedStudents.map(e =>
            transformClassStudentModelToDataProps(e),
          ),
        );

        const unSubscribe = teacherApi.getLiveStudentAttendance(
          classId,
          sessionId,
          listsOfAllJoinedStudents,
          sessionsStudent => {
            setListItems(
              mergeStudentListWithAttendanceInfo(
                listsOfAllJoinedStudents,
                sessionsStudent,
              ),
            );
          },
        );

        return unSubscribe;
      }

      return () => console.log('un implemented');
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

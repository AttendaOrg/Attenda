import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Text } from 'react-native';
import {
  HeaderTitle,
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { RootStackParamList } from '../../App';
import EditAttendanceSession, {
  SessionStudentListDataProps,
} from '../../components/organisms/Teacher/EditAttendanceSession';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';
import SessionStudentModel from '../../api/TeacherApi/model/SessionStudentModel';
import ClassStudentModel from '../../api/TeacherApi/model/ClassStudentModel';
import { CurrentAttendanceSessionDataProps } from '../../components/organisms/Teacher/CurrentAttendanceSession';
import { convertDateTime } from '../../util';
import { lightColor } from '../../util/Colors';
import GlobalContext from '../../context/GlobalContext';

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
  profilePicUrl: data.profilePicUrl ?? undefined,
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

  return students.map<SessionStudentListDataProps>(student => {
    const found: SessionStudentModel | null = findSessionByStudentId(
      sessions,
      student.studentId ?? '',
    );

    if (found === null) return transformClassStudentModelToDataProps(student);

    return transformClassStudentModelToDataProps(student, found.present);
  });
};

const EditAttendanceSessionPage: React.FC<Props> = ({
  route,
  navigation,
}): JSX.Element => {
  const [listItems, setListItems] = useState<
    SessionStudentListDataProps[] | null
  >(null);
  const {
    params: { classId, sessionId, date, totalStudentCount },
  } = route;
  const globalContext = useContext(GlobalContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: lightColor,
        // borderBottomColor: '#ddd',
        // borderBottomWidth: 1,
      },
      headerTitleStyle: { color: '#000' },
      headerLeft: () => (
        <IconButton
          icon="close"
          onPress={() => navigation.canGoBack() && navigation.goBack()}
          color="#000"
        />
      ),
      headerTitle: ({ children, style }) => (
        <>
          <HeaderTitle style={style}>{children}</HeaderTitle>
          <Text>{convertDateTime(new Date(date))}</Text>
        </>
      ),
    });
  }, [navigation, date]);

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
    if (await globalContext.throwNetworkError()) return;
    await teacherApi.editStudentAttendanceReport(
      classId,
      sessionId,
      studentId,
      present,
    );
  };

  return (
    <EditAttendanceSession
      showShimmer={listItems === null}
      totalStudentCount={totalStudentCount}
      studentList={listItems ?? []}
      onPresentChange={onPresentChange}
    />
  );
};

export default EditAttendanceSessionPage;

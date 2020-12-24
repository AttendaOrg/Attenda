import React, { useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import StudentClassList, {
  StudentListDataProps,
} from '../../components/organisms/Student/StudentClassList';
// eslint-disable-next-line import/extensions
import { dummyTeacherClassListData } from '../../components/organisms/Teacher/TeacherClassList/TeacherClassList.stories';
import SimpleHeaderNavigationOptions from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'TeacherClassList'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

export const TeacherClassListNavigationOptions: OptionsProps = SimpleHeaderNavigationOptions;

const TeacherClassListPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [data, setData] = useState<StudentListDataProps[]>([]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setData(dummyTeacherClassListData);
    }, 1000);

    // clean up timer
    return () => clearTimeout(timeId);
  });

  return (
    <StudentClassList
      onFabClick={() => navigation.push('CreateClass')}
      data={data}
      onClassClick={() => {
        navigation.push('StartAttendanceSession', {
          classId: '',
        });
      }}
      onMoreIconClick={() => null}
      options={[
        {
          title: 'Attendance Record',
          onPress: () =>
            navigation.push('TeacherAttendanceRecord', {
              classId: '',
              selectedTab: 'Sessions',
            }),
        },
        {
          title: 'Students',
          onPress: () =>
            navigation.push('StudentList', {
              classId: '',
              showDeleteDialog: false,
              totalSelected: 0,
            }),
        },
        {
          title: 'Settings',
          onPress: () => navigation.push('ClassSettings', { classId: '' }),
        },
        { title: 'Share invitation link', onPress: () => null },
      ]}
    />
  );
};

export default TeacherClassListPage;

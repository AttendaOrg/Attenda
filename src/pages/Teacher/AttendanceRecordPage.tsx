import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs/';
import { RootStackParamList } from '../../App';
import AttendanceSessionRecord from '../../components/organisms/Teacher/AttendanceSessionRecord';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import AttendanceRecordStudentList from '../../components/organisms/Teacher/AttendanceRecordStudentList';
import { StudentListData } from '../../components/organisms/Teacher/StudentList';
import { MarkedDates } from '../../components/organisms/Student/AttendanceRecord';

const dummyListItems: StudentListData[] = [
  {
    name: 'Prasanta Barman',
    rollNo: 'IIT2154',
    key: 'IIT2154',
    checked: false,
    percentage: '90%',
  },
  {
    name: 'Apurba Roy',
    rollNo: 'IIT2441454',
    key: 'IIT2441454',
    checked: false,
    percentage: '95%',
  },
];

const dummyMarkedDates: MarkedDates = {
  '2020-12-12': {
    '03:50 AM': false,
    '10:50 AM': true,
  },
  '2020-12-11': {
    '03:50 AM': true,
    '10:50 AM': true,
  },
};

type Props = StackScreenProps<RootStackParamList, 'TeacherAttendanceRecord'>;

export const TeacherAttendanceRecordNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Attendance Record',
};

const Tab = createMaterialTopTabNavigator();

const AttendanceSessionRecordTab = () => (
  <AttendanceSessionRecord
    markedDates={dummyMarkedDates}
    onMonthChange={() => null}
    onTimeSelect={() => null}
  />
);

// using stack props for getting the navigation autocomplete
// the route props will give wrong autocomplete
// preferably use the MaterialTopTabBarProps
const AttendanceRecordStudentListTab: React.FC<Props> = ({ navigation }) => (
  <AttendanceRecordStudentList
    studentList={dummyListItems}
    onProfileClick={() =>
      navigation.push('EditStudentAttendanceRecord', {
        classId: '',
        studentId: '',
      })
    }
  />
);

const TeacherAttendanceRecordPage: React.FC<Props> = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Sessions" component={AttendanceSessionRecordTab} />
      <Tab.Screen name="Students" component={AttendanceRecordStudentListTab} />
    </Tab.Navigator>
  );
};

export default TeacherAttendanceRecordPage;

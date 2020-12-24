import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import AttendanceRecord, {
  AttendanceRecordPops,
} from '../../components/organisms/Student/AttendanceRecord';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'StudentAttendanceRecord'>;

type OptionsProps = (props: Props) => StackNavigationOptions;

export const AttendanceRecordNavigationOptions: OptionsProps = () => ({
  ...SimpleHeaderBackNavigationOptions,
  title: 'Attendance Record',
});

const dummyData: AttendanceRecordPops = {
  teacherName: 'Aditya Bhargava',
  className: 'Computer science data structures and algorithms',
  section: 'CED/COE',
  rollNo: 'IITE1557454F',
  onMonthChange: () => null,
  markedDates: {
    '2020-12-12': {
      '03:50 AM': false,
      '10:50 AM': true,
    },
    '2020-12-11': {
      '03:50 AM': true,
      '10:50 AM': true,
    },
  },
  percentage: '95%',
};
const AttendanceRecordPage: React.FC<Props> = (): JSX.Element => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <AttendanceRecord {...dummyData} />;
};

export default AttendanceRecordPage;

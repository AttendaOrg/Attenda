import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import EditStudentAttendanceRecord, {
  EditStudentAttendanceRecordPops,
} from '../../components/organisms/Teacher/EditStudentAttendanceRecord';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<
  RootStackParamList,
  'EditStudentAttendanceRecord'
>;

export const EditStudentAttendanceRecordNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Attendance record',
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSrc = require('../../../assets/images/user.jpg');

const dummyData: EditStudentAttendanceRecordPops = {
  userInfo: {
    name: 'Prasanta Barman',
    onRollChange: () => null,
    rollNo: 'IITE1557454',
    userImage: imageSrc,
  },
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChangeAttendance: async () => {},
  onMonthChange: () => null,
};

const EditStudentAttendanceRecordPage: React.FC<Props> = (): JSX.Element => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <EditStudentAttendanceRecord {...dummyData} />;
};

export default EditStudentAttendanceRecordPage;

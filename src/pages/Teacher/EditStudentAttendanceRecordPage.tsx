import React, { useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import EditStudentAttendanceRecord, {
  EditStudentAttendanceRecordPops,
} from '../../components/organisms/Teacher/EditStudentAttendanceRecord';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';
import SessionStudentModel from '../../api/TeacherApi/model/SessionStudentModel';
import { MarkedDates } from '../../components/organisms/Student/AttendanceRecord';
import { convertDateFormat, convertTime, matchDate } from '../../util';

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

const transform = (data: SessionStudentModel[]): MarkedDates => {
  const markedData: MarkedDates = {};

  data.forEach(info => {
    const { sessionTime, present } = info;
    const date = convertDateFormat(sessionTime);
    const time = convertTime(sessionTime);

    if (Object.keys(markedData).includes(date)) {
      markedData[date] = { ...markedData[date], [time]: present };
    } else markedData[date] = { [time]: present };
  });

  return markedData;
};

const EditStudentAttendanceRecordPage: React.FC<Props> = ({
  route,
}): JSX.Element => {
  const [reports, setReports] = useState<SessionStudentModel[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const {
    params: { classId, studentId },
  } = route;

  const fetchData = React.useCallback(async () => {
    const [info] = await teacherApi.getStudentAttendanceReport(
      classId,
      studentId,
      currentMonth,
    );

    // TODO: handel error ?
    if (info !== null) setReports(info);
  }, [classId, currentMonth, studentId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onChangeAttendance = async (
    date: string,
    time: string,
    status: boolean,
  ) => {
    const d = new Date(`${date} ${time}`);

    const report = reports.filter(({ sessionTime }) =>
      matchDate(sessionTime, d),
    );

    if (report.length === 1) {
      const [match] = report;

      await teacherApi.editStudentAttendanceReport(
        classId,
        match.sessionId,
        studentId,
        status,
      );
      fetchData();
    }
  };

  return (
    <EditStudentAttendanceRecord
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...dummyData}
      markedDates={transform(reports)}
      onMonthChange={setCurrentMonth}
      onChangeAttendance={onChangeAttendance}
    />
  );
};

export default EditStudentAttendanceRecordPage;

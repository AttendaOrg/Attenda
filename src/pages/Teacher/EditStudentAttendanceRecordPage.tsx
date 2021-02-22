import React, { useContext, useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import EditStudentAttendanceRecord from '../../components/organisms/Teacher/EditStudentAttendanceRecord';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';
import SessionStudentModel from '../../api/TeacherApi/model/SessionStudentModel';
import { MarkedDates } from '../../components/organisms/Student/AttendanceRecord';
import { convertDateFormat, convertTime, matchDate } from '../../util';
import ClassStudentModel from '../../api/TeacherApi/model/ClassStudentModel';
import GlobalContext from '../../context/GlobalContext';

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

export const convertSessionStudentModelToMarkedDates = (
  data: SessionStudentModel[],
): MarkedDates => {
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
  const [studentInfo, setStudentInfo] = useState<ClassStudentModel | null>(
    null,
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const globalContext = useContext(GlobalContext);
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    (async () => {
      globalContext.changeSpinnerLoading(true);
      const [student] = await teacherApi.getStudentInfo(classId, studentId);

      globalContext.changeSpinnerLoading(false);
      if (student !== null) setStudentInfo(student);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId, studentId]);

  return (
    <EditStudentAttendanceRecord
      userInfo={{
        name: studentInfo?.studentName ?? '', // get the name form api
        onRollChange: () => null, // TODO: update roll no
        rollNo: studentInfo?.rollNo ?? '',
        userImage: imageSrc, // TODO: get the profile pic from api
      }}
      percentage={`${studentInfo?.totalAttendancePercentage ?? 0} %`}
      markedDates={convertSessionStudentModelToMarkedDates(reports)}
      onMonthChange={setCurrentMonth}
      onChangeAttendance={onChangeAttendance}
    />
  );
};

export default EditStudentAttendanceRecordPage;

import React, { useContext, useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import EditStudentAttendanceRecord from '../../components/organisms/Teacher/EditStudentAttendanceRecord';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';
import SessionStudentModel from '../../api/TeacherApi/model/SessionStudentModel';
import {
  MarkedDates,
  MarkTime,
} from '../../components/organisms/Student/AttendanceRecord';
import { convertDateFormat, convertTime } from '../../util';
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
    const { sessionTime, present, sessionId } = info;
    const date = convertDateFormat(sessionTime);
    const time = convertTime(sessionTime);

    if (Object.keys(markedData).includes(date)) {
      markedData[date] = {
        ...markedData[date],
        [time]: { active: present, sessionId },
      };
    } else markedData[date] = { [time]: { active: present, sessionId } };
  });

  return markedData;
};

const limitMarkTime = (markedDates: MarkTime, limit = 3): MarkTime => {
  const newMarkTime: MarkTime = {};

  Object.keys(markedDates).forEach((time, i) => {
    if (i < limit) newMarkTime[time] = markedDates[time];
  });

  return newMarkTime;
};

const limitMarkedDate = (markedDates: MarkedDates): MarkedDates => {
  const newMarkedDates: MarkedDates = {};

  Object.keys(markedDates).forEach(date => {
    newMarkedDates[date] = limitMarkTime(markedDates[date]);
  });

  return newMarkedDates;
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

  const onChangeAttendance = async (sessionId: string, status: boolean) => {
    await teacherApi.editStudentAttendanceReport(
      classId,
      sessionId,
      studentId,
      status,
    );
    fetchData();
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

  const onRollChange = async (newRollNo: string) => {
    await teacherApi.changeStudentRollNo(classId, studentId, newRollNo);
  };

  const userImage: ImageSourcePropType =
    studentInfo?.profilePicUrl !== undefined ||
    studentInfo?.profilePicUrl !== null
      ? { uri: studentInfo?.profilePicUrl }
      : imageSrc;

  return (
    <EditStudentAttendanceRecord
      userInfo={{
        name: studentInfo?.studentName ?? '', // get the name form api
        onRollChange, // TODO: update roll no
        rollNo: studentInfo?.rollNo ?? '',
        userImage,
      }}
      percentage={`${studentInfo?.totalAttendancePercentage.toFixed(1) ?? 0} %`}
      markedDates={limitMarkedDate(
        convertSessionStudentModelToMarkedDates(reports),
      )}
      onMonthChange={setCurrentMonth}
      onChangeAttendance={onChangeAttendance}
    />
  );
};

export default EditStudentAttendanceRecordPage;

import React, { useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import AttendanceRecord, {
  MarkedDates,
} from '../../components/organisms/Student/AttendanceRecord';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { studentApi } from '../../api/StudentApi';
import { teacherApi } from '../../api/TeacherApi';
import SessionStudentModel from '../../api/TeacherApi/model/SessionStudentModel';
import { convertSessionStudentModelToMarkedDates } from '../Teacher/EditStudentAttendanceRecordPage';

type Props = StackScreenProps<RootStackParamList, 'StudentAttendanceRecord'>;

type OptionsProps = (props: Props) => StackNavigationOptions;

export const AttendanceRecordNavigationOptions: OptionsProps = () => ({
  ...SimpleHeaderBackNavigationOptions,
  title: 'Attendance Record',
});

interface ClassInfo {
  teacherName: string;
  className: string;
  section: string;
}

interface MyClassInfo {
  rollNo: string;
  percentage: string;
}

const AttendanceRecordPage: React.FC<Props> = ({ route }): JSX.Element => {
  const [reports, setReports] = useState<SessionStudentModel[]>([]);
  const [month, setMonth] = useState(new Date());
  const [classInfo, setClassInfo] = useState<ClassInfo>({
    teacherName: '',
    className: '',
    section: '',
  });
  const [myInfo, setMyInfo] = useState<MyClassInfo>({
    percentage: '',
    rollNo: '',
  });
  const {
    params: { classId },
  } = route;
  const markedDate: MarkedDates = convertSessionStudentModelToMarkedDates(
    reports,
  );

  useEffect(() => {
    (async () => {
      // TODO: handle error
      const [info] = await teacherApi.getClassInfo(classId);

      if (info !== null)
        setClassInfo({
          className: info.title,
          section: info.section,
          teacherName: '', // TODO: get teacher name from api
        });

      const [joinInfo] = await studentApi.getJoinedClassInfo(classId);

      if (joinInfo !== null)
        setMyInfo({
          percentage: `${joinInfo.totalAttendancePercentage}`,
          rollNo: joinInfo.rollNo,
        });
    })();
  }, [classId]);

  useEffect(() => {
    (async () => {
      const [mReports] = await studentApi.getAttendanceReport(classId);

      if (mReports !== null) {
        setReports(mReports);
      }
    })();
  }, [classId, month]);

  return (
    <AttendanceRecord
      markedDates={markedDate}
      onMonthChange={setMonth}
      className={classInfo.className}
      section={classInfo.section}
      teacherName={classInfo.teacherName}
      percentage={myInfo.percentage}
      rollNo={myInfo.rollNo}
    />
  );
};

export default AttendanceRecordPage;

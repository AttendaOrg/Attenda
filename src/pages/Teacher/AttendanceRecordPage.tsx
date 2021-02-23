import React, { useContext, useEffect, useState } from 'react';
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
import SessionInfoModel from '../../api/TeacherApi/model/SessionInfoModel';
import { convertDateFormat, convertTime, matchDate } from '../../util';
import { teacherApi } from '../../api/TeacherApi';
import ClassStudentModel from '../../api/TeacherApi/model/ClassStudentModel';
import GlobalContext from '../../context/GlobalContext';

type Props = StackScreenProps<RootStackParamList, 'TeacherAttendanceRecord'>;
export type AttendanceRecordTabProps = 'Sessions' | 'Students';

export const TeacherAttendanceRecordNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Attendance Record',
};

const Tab = createMaterialTopTabNavigator();

export const convertSessionInfoToMarkedDates = (
  sessionInfo: SessionInfoModel[],
): MarkedDates => {
  const markedData: MarkedDates = {};

  sessionInfo.forEach(info => {
    const { sessionDate } = info;
    const date = convertDateFormat(sessionDate);
    const time = convertTime(sessionDate);

    if (Object.keys(markedData).includes(date)) {
      // BUG: there can be more than two session in same time more specifically in minutes
      // NOTE: i am explicitly not setting it to a dynamic value because if the value is false
      // the indicator will turn into red which is not the behavior we want.
      markedData[date] = { ...markedData[date], [time]: true };
    } else markedData[date] = { [time]: true };
  });

  return markedData;
};

// using stack props for getting the navigation autocomplete
// the route props will give wrong autocomplete
// preferably use the MaterialTopTabBarProps
const AttendanceSessionRecordTab: React.FC<Props> = ({ navigation, route }) => {
  const [reports, setReports] = useState<SessionInfoModel[]>([]);
  const [info, setInfo] = useState({ className: '', section: '' });
  const [month, setMonth] = useState(new Date());
  const globalContext = useContext(GlobalContext);
  const {
    params: { classId },
  } = route;

  useEffect(() => {
    (async () => {
      const [mReports] = await teacherApi.getClassAttendanceReport(
        classId,
        month,
      );

      if (mReports !== null) {
        setReports(mReports);
      }
    })();
  }, [classId, month]);

  useEffect(() => {
    (async () => {
      globalContext.changeSpinnerLoading(true);
      const [classInfo] = await teacherApi.getClassInfo(classId);

      if (classInfo !== null) {
        setInfo({
          className: classInfo.title,
          section: classInfo.section,
        });
      }
      globalContext.changeSpinnerLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  const markedDate: MarkedDates = convertSessionInfoToMarkedDates(reports);
  const onTimeSelect = (date: string, time: string): void => {
    const d = new Date(`${date} ${time}`);

    const report = reports.filter(({ sessionDate }) =>
      matchDate(sessionDate, d),
    );

    // BUG: there can be more than two session in same time more specifically in minutes
    // so fix it
    if (report.length > 0) {
      const [match] = report;

      navigation.push('EditAttendanceSession', {
        sessionId: match.sessionId ?? '',
        date: new Date(date).toString(),
        classId,
      });
    }
  };

  return (
    <AttendanceSessionRecord
      className={info.className}
      section={info.section}
      markedDates={markedDate}
      onMonthChange={setMonth}
      onTimeSelect={onTimeSelect}
    />
  );
};

const convertStudentListToStudentListData = (
  model: ClassStudentModel,
): StudentListData => ({
  checked: false,
  key: model.studentId ?? '',
  name: model.studentName ?? '',
  rollNo: model.rollNo,
  percentage: `${model.totalAttendancePercentage ?? ''} %`,
});

// using stack props for getting the navigation autocomplete
// the route props will give wrong autocomplete
// preferably use the MaterialTopTabBarProps
const AttendanceRecordStudentListTab: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const [studentList, setStudentList] = useState<StudentListData[]>([]);
  const {
    params: { classId },
  } = route;

  useEffect(() => {
    (async () => {
      const [list] = await teacherApi.getAllStudentList(classId);

      if (list !== null)
        setStudentList(list.map(convertStudentListToStudentListData));
    })();
  }, [classId]);

  return (
    <AttendanceRecordStudentList
      studentList={studentList}
      onProfileClick={(studentId: string) =>
        navigation.push('EditStudentAttendanceRecord', {
          classId,
          studentId,
        })
      }
    />
  );
};

const TeacherAttendanceRecordPage: React.FC<Props> = ({
  route: { params },
}): JSX.Element => {
  const { selectedTab } = params;

  return (
    <Tab.Navigator initialRouteName={selectedTab || 'Sessions'}>
      <Tab.Screen
        name="Sessions"
        component={AttendanceSessionRecordTab}
        initialParams={params}
      />
      <Tab.Screen
        name="Students"
        component={AttendanceRecordStudentListTab}
        initialParams={params}
      />
    </Tab.Navigator>
  );
};

export default TeacherAttendanceRecordPage;

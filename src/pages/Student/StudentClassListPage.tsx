/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import SimpleHeaderNavigationOptions from '../../components/templates/SimpleHeaderNavigationOptions';
import StudentClassList, {
  StudentListDataProps,
} from '../../components/organisms/Student/StudentClassList';
// eslint-disable-next-line import/extensions
import { dummyStudentClassListData } from '../../components/organisms/Student/StudentClassList/StudentClassList.stories';
import NoAttendancePopup from '../../components/molecules/NoAttendancePopup';
import TeacherClassModel from '../../api/TeacherApi/model/TeacherClassModel';
import { studentApi } from '../../api/StudentApi';

type Props = StackScreenProps<RootStackParamList, 'StudentClassList'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const classBack = require('../../../assets/images/class-back-5.jpg');

export const StudentClassListNavigationOptions: OptionsProps = SimpleHeaderNavigationOptions;

const transformToStudentListDataProps = (
  cls: TeacherClassModel,
): StudentListDataProps => {
  const { title, section, classId, isLive, classCode } = cls;

  return {
    attendance: '70', // TODO: get attendance summery from the class info
    section,
    showShimmer: false,
    backgroundImage: classBack,
    className: title,
    key: classId ?? '',
    teacherName: `Class Code: ${classCode}`,
    isSessionLive: isLive,
  };
};

const StudentClassListPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [data, setData] = useState<StudentListDataProps[]>([]);
  const [showNoSessionStartedPopup, setShowNoSessionStartedPopup] = useState(
    false,
  );

  useEffect(() => {
    (async () => {
      const [newData] = await studentApi.getEnrolledClassList(0);

      if (newData !== null) {
        setData(newData.map(transformToStudentListDataProps));
      }
    })();
  }, []);

  const dismissPopup = () => {
    setShowNoSessionStartedPopup(false);
  };

  const onClassClick = (classId: string) => {
    const matched = data
      // get the matching class
      .filter(e => e.key === classId)
      // checks if the session is live
      .filter(e => e.isSessionLive === true);

    if (matched.length > 0) navigation.push('GiveResponse', { classId });
    else setShowNoSessionStartedPopup(true);
  };

  return (
    <>
      <StudentClassList
        onFabClick={() => navigation.push('JoinClassForm', {})}
        data={data}
        onClassClick={onClassClick}
        onMoreIconClick={() =>
          navigation.push('StudentAttendanceRecord', { classId: 'undefined' })
        }
        options={[
          {
            onPress: () =>
              navigation.push('StudentAttendanceRecord', { classId: '' }),
            title: 'Attendance Record',
          },
          { onPress: () => null, title: 'Un-Enroll' },
        ]}
      />
      <NoAttendancePopup
        visible={showNoSessionStartedPopup}
        onCancelClick={dismissPopup}
        onDismiss={dismissPopup}
      />
    </>
  );
};

export default StudentClassListPage;

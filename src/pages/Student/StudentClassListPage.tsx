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

type Props = StackScreenProps<RootStackParamList, 'StudentClassList'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

export const StudentClassListNavigationOptions: OptionsProps = SimpleHeaderNavigationOptions;

const StudentClassListPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [data, setData] = useState<StudentListDataProps[]>([]);
  const [showNoSessionStartedPopup, setShowNoSessionStartedPopup] = useState(
    false,
  );

  useEffect(() => {
    const timeId = setTimeout(() => {
      setData(dummyStudentClassListData);
    }, 1000);

    // clean up timer
    return () => clearTimeout(timeId);
  });

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

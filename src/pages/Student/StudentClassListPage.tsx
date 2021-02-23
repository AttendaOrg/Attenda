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
  const {
    title,
    section,
    classId,
    isLive,
    currentSessionId,
    teacherName,
    alreadyGiven,
  } = cls;

  return {
    // TODO: get attendance summery from the class info
    // we will do it with a cloud function because it is too intensive calculation
    attendance: 'Your Attendance: 70%',
    section,
    showShimmer: false,
    backgroundImage: classBack,
    className: title,
    key: classId ?? '',
    teacherName: `by: ${teacherName}`,
    isSessionLive: isLive,
    currentSessionId,
    alreadyGiven,
  };
};

const mergeGiven = (
  classIds: string[],
  classes: TeacherClassModel[],
): TeacherClassModel[] => {
  return classes.map(cls => {
    if (classIds.includes(cls.classId ?? '')) {
      cls.setAlreadyGiven(true);

      return cls;
    }
    cls.setAlreadyGiven(false);

    return cls;
  });
};

const StudentClassListPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [data, setData] = useState<TeacherClassModel[]>([]);
  const [sessionIds, setSessionIds] = useState<string[]>([]);
  const [givenPresenceClassIds, setGivenPresenceClassIds] = useState<string[]>(
    [],
  );
  const [showNoSessionStartedPopup, setShowNoSessionStartedPopup] = useState(
    false,
  );

  useEffect(() => {
    return studentApi.getEnrolledClassListListener(async newList => {
      if (newList !== null) {
        setData(newList);

        const ids: (string | null)[] = newList
          .map(e => e.currentSessionId)
          .filter(e => e !== null);

        setSessionIds((ids as unknown) as string[]);
      }
    });
  }, []);

  // on every session id changes reattach the listener for checking if the student has given present
  useEffect(() => {
    return studentApi.getPresentClassId(
      sessionIds,
      (givenPresenceClassId = []) =>
        setGivenPresenceClassIds(givenPresenceClassId),
    );
  }, [sessionIds]);

  const dismissPopup = () => setShowNoSessionStartedPopup(false);

  const onClassClick = (
    classId: string,
    currentSessionId: string | null,
    alreadyGiven: boolean,
  ) => {
    const matched = data
      // get the matching class
      .filter(e => e.classId === classId)
      // checks if the session is live
      .filter(e => e.isLive === true);

    if (matched.length > 0) {
      // const isLive = currentSessionId !== null;
      if (currentSessionId !== null && alreadyGiven !== true)
        navigation.push('GiveResponse', {
          classId,
          sessionId: currentSessionId,
        });
    }
    if (currentSessionId === null) setShowNoSessionStartedPopup(true);
  };

  const unEnroll = async (classId: string) => {
    await studentApi.leaveClass(classId);
  };

  const merged = mergeGiven(givenPresenceClassIds, data);
  const transformedData = merged.map(transformToStudentListDataProps);

  return (
    <>
      <StudentClassList
        onFabClick={() => navigation.push('JoinClassForm', {})}
        data={transformedData}
        onClassClick={onClassClick}
        options={[
          {
            onPress: classId =>
              navigation.push('StudentAttendanceRecord', { classId }),
            title: 'Attendance Record',
          },
          { onPress: unEnroll, title: 'Un-Enroll' },
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

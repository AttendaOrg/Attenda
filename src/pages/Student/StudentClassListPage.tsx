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
import TeacherClassModel from '../../api/TeacherApi/model/TeacherClassModel';
import { studentApi } from '../../api/StudentApi';
import ImagePopup from '../../components/molecules/ImagePopup/ImagePopup';
import SearchingImageComponent from '../../components/atoms/Images/SearchingImageComponent';
import ClassStudentModel from '../../api/TeacherApi/model/ClassStudentModel';
import DoubleButtonPopup from '../../components/molecules/DoubleButtonPopup';

type Props = StackScreenProps<RootStackParamList, 'StudentClassList'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const classBack = require('../../../assets/images/class-back-5.jpg');

export const StudentClassListNavigationOptions: OptionsProps = SimpleHeaderNavigationOptions;

const transformToStudentListDataProps = (
  cls: TeacherClassModel,
  percentageModels: ClassStudentModel[],
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

  const match = percentageModels.filter(m => m.classId === classId);
  const percentage = match[0]?.totalAttendancePercentage ?? 0;

  return {
    // TODO: get attendance summery from the class info
    // we will do it with a cloud function because it is too intensive calculation
    attendance: `Your Attendance: ${percentage.toFixed(1)}%`,
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
  const [loading, setLoading] = useState(true);
  const [unEnrollId, setUnEnrollId] = useState<string | null>(null);
  const [data, setData] = useState<TeacherClassModel[]>([]);
  const [percentageModels, setPercentageModels] = useState<ClassStudentModel[]>(
    [],
  );
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
        setLoading(false);

        const ids: (string | null)[] = newList
          .map(e => e.currentSessionId)
          .filter(e => e !== null);

        setSessionIds((ids as unknown) as string[]);
      }
    });
  }, []);

  useEffect(() => {
    return studentApi.getEnrolledPercentageListener(
      async (_percentageModels: ClassStudentModel[]) => {
        setPercentageModels(_percentageModels);
        console.log(_percentageModels);
      },
    );
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
  const transformedData = merged.map(e =>
    transformToStudentListDataProps(e, percentageModels),
  );

  const dismissUnEnrollPopup = () => {
    setUnEnrollId(null);
  };

  return (
    <>
      <StudentClassList
        showShimmer={loading}
        onFabClick={() => navigation.push('JoinClassForm', {})}
        data={transformedData}
        onClassClick={onClassClick}
        options={[
          {
            onPress: classId =>
              navigation.push('StudentAttendanceRecord', { classId }),
            title: 'Attendance Record',
          },
          { onPress: setUnEnrollId, title: 'Un-Enroll' },
        ]}
      />
      <DoubleButtonPopup
        visible={unEnrollId !== null}
        title="Un Enroll"
        text="Are you sure you want to un-enroll form the class"
        positiveButtonText="Un-Enroll"
        negativeButtonText="Cancel"
        onPositiveButtonClick={async () => {
          if (unEnrollId !== null) await unEnroll(unEnrollId);
          dismissUnEnrollPopup();
        }}
        onNegativeButtonClick={dismissUnEnrollPopup}
        onDismiss={dismissUnEnrollPopup}
      />
      <ImagePopup
        imageComponent={SearchingImageComponent}
        title="Oopss...."
        text="No attendance session is going on"
        visible={showNoSessionStartedPopup}
        onCancelClick={dismissPopup}
        onDismiss={dismissPopup}
      />
    </>
  );
};

export default StudentClassListPage;

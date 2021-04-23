/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useContext, useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../App';
import SimpleHeaderNavigationOptions from '../../components/templates/SimpleHeaderNavigationOptions';
import StudentClassList, {
  StudentListDataProps,
  dummyStudentClassListData,
} from '../../components/organisms/Student/StudentClassList';
import TeacherClassModel from '../../api/TeacherApi/model/TeacherClassModel';
import { studentApi } from '../../api/StudentApi';
import ImagePopup from '../../components/molecules/ImagePopup/ImagePopup';
import SearchingImageComponent from '../../components/atoms/Images/SearchingImageComponent';
import ClassStudentModel from '../../api/TeacherApi/model/ClassStudentModel';
import DoubleButtonPopup from '../../components/molecules/DoubleButtonPopup';
import { StudentClassAction } from '../../components/molecules/ClassCard/StudentClassCard';
import { authApi } from '../../api/AuthApi';
import GlobalContext from '../../context/GlobalContext';

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
    classIcon,
  } = cls;

  const match = percentageModels.filter(m => m.classId === classId);
  const percentage = match[0]?.totalAttendancePercentage ?? 0;

  return {
    // TODO: get attendance summery from the class info
    // we will do it with a cloud function because it is too intensive calculation
    attendance: percentage,
    section,
    showShimmer: false,
    backgroundImage: classBack,
    className: title,
    classId: classId ?? '',
    teacherName: teacherName ?? '',
    isSessionLive: isLive,
    currentSessionId,
    alreadyGiven,
    classIcon,
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

const StudentClassListPage: React.FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const context = useContext(GlobalContext);
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

  const handleCode = React.useCallback(async () => {
    const joinCode = await AsyncStorage.getItem('@joinCode');

    if (typeof joinCode === 'string' && joinCode.length > 0) {
      navigation.push('JoinClassForm', { classCode: joinCode });
      await AsyncStorage.removeItem('@joinCode');
    }
  }, [navigation]);

  const handleAppStateChange = React.useCallback(
    (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        handleCode();
      }
    },
    [handleCode],
  );

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    handleCode();

    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, [handleAppStateChange, handleCode, navigation]);

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
    try {
      const uri = authApi.getMyProfilePic();

      context.changeProfilePic({ uri });
    } catch (e) {
      console.log('Image access error', e);
    }
    context.changeSpinnerLoading(false);

    return studentApi.getEnrolledPercentageListener(
      async (_percentageModels: ClassStudentModel[]) => {
        setPercentageModels(_percentageModels);
        console.log(_percentageModels);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onAction = async (
    action: StudentClassAction,
    info: StudentListDataProps,
  ): Promise<void> => {
    const { classId } = info;

    if (await context.throwNetworkError()) return;
    if (classId === null) return;

    switch (action) {
      case StudentClassAction.ATTENDANCE_RECORD:
        navigation.push('StudentAttendanceRecord', { classId });
        break;
      case StudentClassAction.UN_ENROLL:
        setUnEnrollId(classId);
        break;

      default:
        break;
    }
  };

  const onClassClick = async (classInfo: StudentListDataProps) => {
    const { alreadyGiven, currentSessionId, classId } = classInfo;

    if (await context.throwNetworkError()) return;

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

  const newData: StudentListDataProps[] = loading
    ? dummyStudentClassListData
    : transformedData;

  return (
    <>
      <StudentClassList
        showShimmer={loading}
        onFabClick={() => navigation.push('JoinClassForm', {})}
        data={newData}
        onAction={onAction}
        onClassClick={onClassClick}
      />
      <DoubleButtonPopup
        visible={unEnrollId !== null}
        title="Un Enroll"
        text="Are you sure you want to un-enroll form this class?"
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

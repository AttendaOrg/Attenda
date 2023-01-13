import React, { useContext, useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';
import { HEADER_AB_TEST_NEW } from '../../util/constant';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';
import GlobalContext from '../../context/GlobalContext';
import { studentApi } from '../../api/StudentApi';
import TeacherClassModel from '../../api/TeacherApi/model/TeacherClassModel';
import JoinClass from '../../components/organisms/Student/JoinClass/JoinClass';

type Props = StackScreenProps<RootStackParamList, 'JoinClassFinal'>;

export const JoinClassFinalNavigationOptions: StackNavigationOptions = HEADER_AB_TEST_NEW
  ? { ...SimpleHeaderBackNavigationOptions, title: 'Join Class' }
  : SimpleCloseNavigationOptions;

const JoinClassFinalPage: React.FC<Props> = ({
  navigation,
  route: {
    params: { preloadClassCode },
  },
}): JSX.Element => {
  const globalContext = useContext(GlobalContext);
  const [classInfo, setClassInfo] = useState<TeacherClassModel | null>(null);
  const [noClassFound, setNoClassFound] = useState(false);

  const loadClassInfo = async (classCode: string) => {
    globalContext.changeSpinnerLoading(true);

    const [info] = await teacherApi.getClassInfoByCode(classCode);

    if (info !== null) {
      setClassInfo(info);
      setNoClassFound(false);
    } else {
      setNoClassFound(true);
    }

    globalContext.changeSpinnerLoading(false);
  };

  const joinClass = async (rollNo: string) => {
    const classId = classInfo?.classId ?? null;

    if (await globalContext.throwNetworkError()) return;

    if (classId !== null && classId !== '') {
      globalContext.changeSpinnerLoading(true);
      await studentApi.joinClass(classId, rollNo);
      globalContext.changeSpinnerLoading(false);
      navigation.pop(2);
    }
    // TODO: handle error if the classId is not found
  };

  useEffect(() => {
    (async () => {
      if (typeof preloadClassCode === 'string' && preloadClassCode.length > 0) {
        await loadClassInfo(preloadClassCode);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadClassCode]);

  return (
    <JoinClass
      resetNoClassFound={() => setNoClassFound(false)}
      noClassFound={noClassFound}
      classInfo={classInfo}
      onJoinClass={joinClass}
      onGetClassCode={loadClassInfo}
    />
  );
};

export default JoinClassFinalPage;

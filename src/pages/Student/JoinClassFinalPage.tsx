import React, { useContext, useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import JoinClassFinal from '../../components/organisms/Student/JoinClassFinal';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';
import { HEADER_AB_TEST_NEW } from '../../util/constant';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';
import GlobalContext from '../../context/GlobalContext';
import { studentApi } from '../../api/StudentApi';
import TeacherClassModel from '../../api/TeacherApi/model/TeacherClassModel';

type Props = StackScreenProps<RootStackParamList, 'JoinClassFinal'>;

export const JoinClassFinalNavigationOptions: StackNavigationOptions = HEADER_AB_TEST_NEW
  ? { ...SimpleHeaderBackNavigationOptions, title: 'Join Class' }
  : SimpleCloseNavigationOptions;

interface State {
  teacher: string;
  section: string;
  className: string;

  classId: string;
}

const JoinClassFinalPage: React.FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const {
    params: { classCode, rollNo },
  } = route;
  const globalContext = useContext(GlobalContext);
  const [accInfo, setAccInfo] = useState<TeacherClassModel | null>(null);

  useEffect(() => {
    (async () => {
      globalContext.changeSpinnerLoading(true);

      const [info] = await teacherApi.getClassInfoByCode(classCode);
      const [success] = await studentApi.validateClassJoin(classCode, rollNo); // TODO: handle error if there validate join class is failed

      if (info !== null) setAccInfo(info);
      globalContext.changeSpinnerLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joinClass = async () => {
    const classId = accInfo?.classId ?? null;

    if (classId !== null && classId !== '') {
      globalContext.changeSpinnerLoading(true);
      await studentApi.joinClass(classId, rollNo);
      globalContext.changeSpinnerLoading(false);
      navigation.pop(2);
    }
    // TODO: handle error if the classId is not found
  };

  return (
    <JoinClassFinal
      className={accInfo?.title ?? ''}
      section={accInfo?.section ?? ''}
      teacher={accInfo?.teacherName ?? ''}
      onDone={joinClass}
      disableJoin={!(accInfo?.isActiveInvite ?? true)}
    />
  );
};

export default JoinClassFinalPage;

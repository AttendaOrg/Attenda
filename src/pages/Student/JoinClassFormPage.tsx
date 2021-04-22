import React, { useContext } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import JoinClassForm from '../../components/organisms/Student/JoinClassForm';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';
import { HEADER_AB_TEST_NEW } from '../../util/constant';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import GlobalContext from '../../context/GlobalContext';

type Props = StackScreenProps<RootStackParamList, 'JoinClassForm'>;

export const JoinClassFormNavigationOptions: StackNavigationOptions = HEADER_AB_TEST_NEW
  ? { ...SimpleHeaderBackNavigationOptions, title: 'Join Class' }
  : SimpleCloseNavigationOptions;

const JoinClassFormPage: React.FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const {
    params: { classCode: _classCode },
  } = route;
  const globalContext = useContext(GlobalContext);

  return (
    <JoinClassForm
      joinCode={_classCode}
      onSubmit={async (classCode, rollNo) => {
        if (await globalContext.throwNetworkError()) return;
        navigation.navigate('JoinClassFinal', { classCode, rollNo });
      }}
    />
  );
};

export default JoinClassFormPage;

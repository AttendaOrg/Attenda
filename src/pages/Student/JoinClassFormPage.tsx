import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import JoinClassForm from '../../components/organisms/Student/JoinClassForm';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';

type Props = StackScreenProps<RootStackParamList, 'JoinClassForm'>;

export const JoinClassFormNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;

const JoinClassFormPage: React.FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const {
    params: { classCode: _classCode },
  } = route;

  return (
    <JoinClassForm
      joinCode={_classCode}
      onSubmit={(classCode, rollNo) =>
        navigation.navigate('JoinClass', { classCode, rollNo })
      }
    />
  );
};

export default JoinClassFormPage;

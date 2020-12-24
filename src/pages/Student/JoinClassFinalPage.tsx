import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import JoinClassFinal from '../../components/organisms/Student/JoinClassFinal';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';
import { HEADER_AB_TEST_NEW } from '../../util/constant';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'JoinClassFinal'>;

export const JoinClassFinalNavigationOptions: StackNavigationOptions = HEADER_AB_TEST_NEW
  ? { ...SimpleHeaderBackNavigationOptions, title: 'Join Class' }
  : SimpleCloseNavigationOptions;

const defaultClassInfo = {
  teacher: 'Aditya Bhargava',
  section: 'CED/COE',
  className: 'Computer science data structures and algorithms',
};

const JoinClassFinalPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <JoinClassFinal
      className={defaultClassInfo.className}
      section={defaultClassInfo.section}
      teacher={defaultClassInfo.teacher}
      onDone={() => navigation.pop(2)}
    />
  );
};

export default JoinClassFinalPage;

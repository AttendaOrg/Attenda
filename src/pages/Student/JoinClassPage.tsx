import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import JoinClass from '../../components/organisms/Student/JoinClass';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';

type Props = StackScreenProps<RootStackParamList, 'JoinClass'>;

export const JoinClassNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;

const defaultClassInfo = {
  teacher: 'Aditya Bhargava',
  section: 'CED/COE',
  className: 'Computer science data structures and algorithms',
};

const JoinClassPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <JoinClass
      className={defaultClassInfo.className}
      section={defaultClassInfo.section}
      teacher={defaultClassInfo.teacher}
      onDone={() => navigation.pop(2)}
    />
  );
};

export default JoinClassPage;

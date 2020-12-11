import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import EmptyClass from '../components/organisms/Student/EmptyClass/EmptyClass';
import SimpleHeaderNavigationOptions from '../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'StudentClassList'>;

export const StudentClassListNavigationOptions: StackNavigationOptions = SimpleHeaderNavigationOptions;

const StudentClassListPage: React.FC<Props> = (): JSX.Element => {
  return <EmptyClass onFabClick={() => null} />;
};

export default StudentClassListPage;

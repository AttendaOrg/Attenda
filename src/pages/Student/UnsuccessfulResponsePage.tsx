import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import UnsuccessfulResponse from '../../components/organisms/Student/UnsuccessfulResponse';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';
import { HEADER_AB_TEST_NEW } from '../../util/constant';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'UnsuccessfulResponse'>;

export const UnsuccessfulResponseNavigationOptions: StackNavigationOptions = HEADER_AB_TEST_NEW
  ? { ...SimpleHeaderBackNavigationOptions, title: 'Attendance Unsuccessful' }
  : SimpleCloseNavigationOptions;

const UnsuccessfulResponsePage: React.FC<Props> = (): JSX.Element => {
  return <UnsuccessfulResponse refreshing={false} onRefresh={() => null} />;
};

export default UnsuccessfulResponsePage;

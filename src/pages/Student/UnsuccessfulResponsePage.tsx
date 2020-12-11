import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import UnsuccessfulResponse from '../../components/organisms/Student/UnsuccessfulResponse';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';

type Props = StackScreenProps<RootStackParamList, 'UnsuccessfulResponse'>;

export const UnsuccessfulResponseNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;

const UnsuccessfulResponsePage: React.FC<Props> = (): JSX.Element => {
  return <UnsuccessfulResponse refreshing={false} onRefresh={() => null} />;
};

export default UnsuccessfulResponsePage;

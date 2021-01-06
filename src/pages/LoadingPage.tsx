import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import Loading from '../components/organisms/AppIntro/Loading/Loading';
import { NoHeaderNavigationOptions } from '../components/templates/SimpleCloseNavigationOption';

type Props = StackScreenProps<RootStackParamList, 'Loading'>;

export const LoadindPageNavigationOptions: StackNavigationOptions = NoHeaderNavigationOptions;

const LoadingPage: React.FC<Props> = (): JSX.Element => {
  return <Loading />;
};

export default LoadingPage;

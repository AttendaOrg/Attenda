import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import TurnOnWifi from '../../components/organisms/Student/TurnOnWifi';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';

type Props = StackScreenProps<RootStackParamList, 'TurnOnWifi'>;

export const TurnOnWifiNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;

const TurnOnWifiPage: React.FC<Props> = (): JSX.Element => {
  return <TurnOnWifi onRefresh={() => null} refreshing={false} />;
};

export default TurnOnWifiPage;

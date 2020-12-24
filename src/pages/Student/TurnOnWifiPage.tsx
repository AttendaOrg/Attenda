import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import TurnOnWifi from '../../components/organisms/Student/TurnOnWifi';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';
import { HEADER_AB_TEST_NEW } from '../../util/constant';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'TurnOnWifi'>;

export const TurnOnWifiNavigationOptions: StackNavigationOptions = HEADER_AB_TEST_NEW
  ? { ...SimpleHeaderBackNavigationOptions, title: 'Turn on Wifi' }
  : SimpleCloseNavigationOptions;

const TurnOnWifiPage: React.FC<Props> = (): JSX.Element => {
  return <TurnOnWifi onRefresh={() => null} refreshing={false} />;
};

export default TurnOnWifiPage;

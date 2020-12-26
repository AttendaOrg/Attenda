import React, { useEffect } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import GiveResponse from '../../components/organisms/Student/GiveResponse';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';
import { HEADER_AB_TEST_NEW } from '../../util/constant';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'GiveResponse'>;

export const GiveResponseNavigationOptions: StackNavigationOptions = HEADER_AB_TEST_NEW
  ? { ...SimpleHeaderBackNavigationOptions, title: 'Give Present' }
  : SimpleCloseNavigationOptions;

const GiveResponsePage: React.FC<Props> = ({ navigation }): JSX.Element => {
  useEffect(() => {
    navigation.push('TurnOnWifi');
  });

  return (
    <GiveResponse
      onPresentClick={() => {
        if (Math.random() > 0.5) navigation.replace('SuccessResponse');
        else navigation.push('UnsuccessfulResponse');
      }}
    />
  );
};

export default GiveResponsePage;

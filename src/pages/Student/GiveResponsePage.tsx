import React, { useEffect } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import GiveResponse from '../../components/organisms/Student/GiveResponse';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';

type Props = StackScreenProps<RootStackParamList, 'GiveResponse'>;

export const GiveResponseNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;

const GiveResponsePage: React.FC<Props> = ({ navigation }): JSX.Element => {
  useEffect(() => {
    navigation.push('TurnOnWifi');
  });

  return (
    <GiveResponse
      onPresentClick={() => {
        if (Math.random() > 0.5) navigation.push('SuccessResponse');
        else navigation.push('UnsuccessfulResponse');
      }}
    />
  );
};

export default GiveResponsePage;

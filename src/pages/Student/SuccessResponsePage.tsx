import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import SuccessResponse from '../../components/organisms/Student/SuccessResponse';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';
import { HEADER_AB_TEST_NEW } from '../../util/constant';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'SuccessResponse'>;

export const SuccessResponseNavigationOptions: StackNavigationOptions = HEADER_AB_TEST_NEW
  ? { ...SimpleHeaderBackNavigationOptions, title: 'Present Successful' }
  : SimpleCloseNavigationOptions;

const SuccessResponsePage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <SuccessResponse
      onDoneClick={() => {
        navigation.navigate('StudentClassList');
      }}
    />
  );
};

export default SuccessResponsePage;

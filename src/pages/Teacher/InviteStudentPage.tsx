import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import InviteStudent from '../../components/organisms/Teacher/InviteStudent';
import { withSimpleCloseNavigationOptions } from '../../components/templates/SimpleCloseNavigationOption';

type Props = StackScreenProps<RootStackParamList, 'InviteStudent'>;

export const InviteStudentNavigationOptions: StackNavigationOptions = withSimpleCloseNavigationOptions(
  'Invite Students',
);

const InviteStudentPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <InviteStudent
      onInvite={() => {
        if (navigation.canGoBack()) navigation.goBack();
      }}
    />
  );
};

export default InviteStudentPage;

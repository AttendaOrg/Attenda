import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import ChooseRole, { Role } from '../components/organisms/AppIntro/ChooseRole';
import SimpleCloseNavigationOptions from '../components/templates/SimpleCloseNavigationOption';

type Props = StackScreenProps<RootStackParamList, 'ChooseRole'>;

export const ChooseRoleNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;

const ChooseRolePage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <ChooseRole
      onDone={(role: Role) => {
        switch (role) {
          case Role.Student:
            // resetting the navigation stack for performance reason
            // this will cause the app to forgot previous items in stack
            // for this if the use click back from next screen it will cause the app to exit
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'StudentClassList' }],
              }),
            );
            break;
          default:
            break;
        }
      }}
    />
  );
};

export default ChooseRolePage;

import React, { useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import ChooseRole, { Role } from '../components/organisms/ChooseRole';
import SimpleCloseNavigationOptions from '../components/templates/SimpleCloseNavigationOption';

type Props = StackScreenProps<RootStackParamList, 'ChooseRole'>;

export const ChooseRoleNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;

const ChooseRolePage: React.FC<Props> = (): JSX.Element => {
  const [role, setRole] = useState<Role>();

  return <ChooseRole onDone={setRole} />;
};

export default ChooseRolePage;

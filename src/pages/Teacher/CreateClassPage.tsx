import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import CreateClass from '../../components/organisms/Teacher/CreateClass/CreateClass';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'CreateClass'>;

export const CreateClassNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Create Class',
};

const CreateClassPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <CreateClass
      onDone={() =>
        navigation.replace('TeacherAttendanceRecord', {
          classId: '',
          selectedTab: 'Students',
        })
      }
    />
  );
};

export default CreateClassPage;

import React, { useContext } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import CreateClass from '../../components/organisms/Teacher/CreateClass/CreateClass';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';
import TeacherClassModel from '../../api/TeacherApi/model/TeacherClassModel';
import GlobalContext from '../../context/GlobalContext';

type Props = StackScreenProps<RootStackParamList, 'CreateClass'>;

export const CreateClassNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Create Class',
};

const CreateClassPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const globalContext = useContext(GlobalContext);

  const onDoneClick = async (title: string, section: string) => {
    globalContext.changeSpinnerLoading(true);
    const newClass = new TeacherClassModel({
      section,
      title,
      teacherId: teacherApi.getUserUid(),
    });

    const [classId, error] = await teacherApi.createClass(newClass);

    globalContext.changeSpinnerLoading(false);
    // TODO: handle error
    if (error === null && classId !== null)
      navigation.replace('StudentList', {
        classId,
      });
  };

  return <CreateClass onDone={onDoneClick} />;
};

export default CreateClassPage;

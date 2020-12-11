/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import SimpleHeaderNavigationOptions from '../../components/templates/SimpleHeaderNavigationOptions';
import StudentClassList, {
  StudentListDataProps,
} from '../../components/organisms/Student/StudentClassList';
// eslint-disable-next-line import/extensions
import { dummyStudentClassListData } from '../../components/organisms/Student/StudentClassList/StudentClassList.stories';

type Props = StackScreenProps<RootStackParamList, 'StudentClassList'>;

export const StudentClassListNavigationOptions: StackNavigationOptions = SimpleHeaderNavigationOptions;

const StudentClassListPage: React.FC<Props> = (): JSX.Element => {
  const [data, setData] = useState<StudentListDataProps[]>([]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setData(dummyStudentClassListData);
    }, 1000);

    // clean up timer
    return () => clearTimeout(timeId);
  });

  return <StudentClassList onFabClick={() => null} data={data} />;
};

export default StudentClassListPage;

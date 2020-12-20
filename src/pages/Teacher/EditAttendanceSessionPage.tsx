import React, { useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import EditAttendanceSession, {
  SessionStudentListDataProps,
} from '../../components/organisms/Teacher/EditAttendanceSession';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

type Props = StackScreenProps<RootStackParamList, 'EditAttendanceSession'>;

export const EditAttendanceSessionNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Attendance record',
};

const EditAttendanceSessionPage: React.FC<Props> = (): JSX.Element => {
  const [listItems, setListItems] = useState<SessionStudentListDataProps[]>([
    {
      name: 'Prasanta Barman',
      rollNo: 'IIT2154',
      key: 'IIT2154',
      present: false,
    },
    {
      name: 'Apurba Roy',
      rollNo: 'IIT2441454',
      key: 'IIT2441454',
      present: false,
    },
  ]);

  const onPresentChange = async (rollNo: string, present: boolean) => {
    const newList = listItems.map(item =>
      item.rollNo === rollNo ? { ...item, present } : item,
    );

    setListItems(newList);
  };

  return (
    <EditAttendanceSession
      studentList={listItems}
      onPresentChange={onPresentChange}
    />
  );
};

export default EditAttendanceSessionPage;

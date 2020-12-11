/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { FlatList, View } from 'react-native';
import { RootStackParamList } from '../../App';
import ClassCard from '../../components/molecules/ClassCard';
import SimpleHeaderNavigationOptions from '../../components/templates/SimpleHeaderNavigationOptions';
import EmptyClass from '../../components/organisms/common/EmptyClass';
import { ClassCardPops } from '../../components/molecules/ClassCard/ClassCard';

type Props = StackScreenProps<RootStackParamList, 'StudentClassList'>;

export const StudentClassListNavigationOptions: StackNavigationOptions = SimpleHeaderNavigationOptions;

const classBack1 = require('../../../assets/images/class-back-1.jpg');
const classBack2 = require('../../../assets/images/class-back-2.jpg');
const classBack3 = require('../../../assets/images/class-back-3.jpg');
const classBack4 = require('../../../assets/images/class-back-4.jpg');
const classBack5 = require('../../../assets/images/class-back-5.jpg');

interface FlatListDataProps extends ClassCardPops {
  key: string;
}

const dummyData: FlatListDataProps[] = [
  {
    attendance: 'Your Attendance: 92%',
    backgroundImage: classBack1,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Teacher Name',
    isSessionLive: true,
    key: 'key1',
  },
  {
    attendance: 'Your Attendance: 99%',
    backgroundImage: classBack2,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Teacher Name',
    isSessionLive: false,
    key: 'key2',
  },
  {
    attendance: 'Your Attendance: 99%',
    backgroundImage: classBack3,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Teacher Name',
    isSessionLive: false,
    key: 'key3',
  },
  {
    attendance: 'Your Attendance: 99%',
    backgroundImage: classBack4,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Teacher Name',
    isSessionLive: false,
    key: 'key4',
  },
  {
    attendance: 'Your Attendance: 99%',
    backgroundImage: classBack5,
    className: 'Class Name',
    section: 'Section',
    teacherName: 'Teacher Name',
    isSessionLive: false,
    key: 'key5',
  },
];

const StudentClassListPage: React.FC<Props> = (): JSX.Element => {
  const [data, setData] = useState<FlatListDataProps[]>([]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setData(dummyData);
    }, 1000);

    // clean up timer
    return () => clearTimeout(timeId);
  });

  if (data.length === 0) return <EmptyClass onFabClick={() => null} />;

  return (
    <View style={{ padding: 8 }}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <ClassCard
            className={item.className}
            section={item.section}
            teacherName={item.teacherName}
            attendance={item.attendance}
            isSessionLive={item.isSessionLive}
            onCardClick={() => null}
            onMoreIconClick={() => null}
            backgroundImage={item.backgroundImage}
          />
        )}
      />
    </View>
  );
};

export default StudentClassListPage;

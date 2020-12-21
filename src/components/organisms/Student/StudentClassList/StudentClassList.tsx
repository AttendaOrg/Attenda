import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import ClassCard from '../../../molecules/ClassCard';
import { ClassCardPops } from '../../../molecules/ClassCard/ClassCard';
import EmptyClass from '../../common/EmptyClass';
import { MenuOptionsPopoverDataProps } from '../../../molecules/MenuOptionsPopover';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  separator: {
    height: 8,
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#03A9F4',
    right: 20,
    bottom: 20,
  },
});

export interface StudentListDataProps extends ClassCardPops {
  key: string;
}

export interface StudentClassListPops {
  data: StudentListDataProps[];
  onFabClick: () => void;
  onClassClick: (classId: string) => void;
  /**
   * @deprecated this function is deprecated
   * @use options props
   */
  onMoreIconClick?: () => void;
  options?: MenuOptionsPopoverDataProps[];
}

const StudentClassList: React.FC<StudentClassListPops> = ({
  data = [],
  onFabClick,
  onClassClick,
  onMoreIconClick = () => null,
  options = [],
}): JSX.Element => {
  if (data.length === 0) return <EmptyClass onFabClick={onFabClick} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <ClassCard
            className={item.className}
            section={item.section}
            teacherName={item.teacherName}
            attendance={item.attendance}
            isSessionLive={item.isSessionLive}
            onCardClick={() => onClassClick(item.key)}
            options={options}
            onMoreIconClick={onMoreIconClick}
            backgroundImage={item.backgroundImage}
          />
        )}
      />
      <FAB style={styles.fab} icon="plus" color="#fff" onPress={onFabClick} />
    </View>
  );
};

export default StudentClassList;

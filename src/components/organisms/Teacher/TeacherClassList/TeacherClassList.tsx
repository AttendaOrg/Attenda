import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { UserRole } from '../../../../api';
import ClassCard from '../../../molecules/ClassCard';
import { ClassCardPops } from '../../../molecules/ClassCard/ClassCard';
import { MenuOptionsPopoverDataProps } from '../../../molecules/MenuOptionsPopover';
import EmptyClass from '../../Common/EmptyClass';

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
    backgroundColor: '#2196f3',
    right: 20,
    bottom: 20,
  },
});

export interface StudentListDataProps extends ClassCardPops {
  key: string;
}

export interface TeacherClassListPops {
  data: StudentListDataProps[];
  onFabClick: () => void;
  onClassClick: (classId: string, name: string, section: string) => void;
  /**
   * @deprecated this function is deprecated
   * @use options props
   */
  onMoreIconClick?: () => void;
  options?: MenuOptionsPopoverDataProps[];
  showShimmer?: boolean;
}

const TeacherClassList: React.FC<TeacherClassListPops> = ({
  data = [],
  onFabClick,
  onClassClick,
  onMoreIconClick = () => null,
  options = [],
  showShimmer = false,
}): JSX.Element => {
  if (data.length === 0)
    return <EmptyClass onFabClick={onFabClick} userRole={UserRole.TEACHER} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <ClassCard
            showShimmer={showShimmer}
            className={item.className}
            section={item.section}
            teacherName={item.teacherName}
            attendance={item.attendance}
            isSessionLive={item.isSessionLive}
            currentSessionId={item.currentSessionId}
            classId={item.key}
            onCardClick={() =>
              onClassClick(item.key, item.className, item.section)
            }
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

export default TeacherClassList;

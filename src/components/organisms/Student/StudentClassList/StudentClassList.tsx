import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { ClassCardPops } from '../../../molecules/ClassCard/ClassCard';
import EmptyClass from '../../Common/EmptyClass';
import { UserRole } from '../../../../api';
import StudentClassCard, {
  StudentClassAction,
} from '../../../molecules/ClassCard/StudentClassCard';

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
  classId: string;
}

export interface StudentClassListPops {
  data: StudentListDataProps[];
  onFabClick: () => void;
  onClassClick: (classInfo: StudentListDataProps) => void;
  onAction: (
    action: StudentClassAction,
    classInfo: StudentListDataProps,
  ) => void;
  showShimmer?: boolean;
}

const StudentClassList: React.FC<StudentClassListPops> = ({
  data = [],
  onFabClick,
  onClassClick,
  showShimmer = false,
  onAction = () => null,
}): JSX.Element => {
  if (data.length === 0)
    return <EmptyClass onFabClick={onFabClick} userRole={UserRole.STUDENT} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(info, index) => info.classId ?? `class-${index}`}
        renderItem={({ item }) => (
          <StudentClassCard
            data={{
              title: item.className,
              section: item.section,
              alreadyGiven: item.alreadyGiven ?? false,
              teacherName: item.teacherName,
              totalAttendancePercentage: item.attendance,
              isLive: item.isSessionLive ?? false,
            }}
            onAction={action => onAction(action, item)}
            showShimmer={showShimmer}
            onPress={() => onClassClick(item)}
          />
        )}
        ListFooterComponent={
          <View
            style={{
              height: 95,
              width: '100%',
            }}
          />
        }
      />
      <FAB style={styles.fab} icon="plus" color="#fff" onPress={onFabClick} />
    </View>
  );
};

export default StudentClassList;

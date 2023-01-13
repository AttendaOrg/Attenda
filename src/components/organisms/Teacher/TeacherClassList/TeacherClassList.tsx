import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { UserRole } from '../../../../api';
import TeacherClassModel from '../../../../api/TeacherApi/model/TeacherClassModel';
import { ClassCardPops } from '../../../molecules/ClassCard/ClassCard';
import {
  TeacherClassAction,
  TeacherClassCard,
} from '../../../molecules/ClassCard/TeacherClassCard';
import EmailVerificationNotice from '../../../molecules/EmailVerificationNotice/EmailVerificationNotice';
import { MenuOptionsPopoverDataProps } from '../../../molecules/MenuOptionsPopover';
import EmptyClass from '../../Common/EmptyClass';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
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
  data: TeacherClassModel[];
  onFabClick: () => void;
  onClassClick: (classInfo: TeacherClassModel) => void;
  onAction: (action: TeacherClassAction, classInfo: TeacherClassModel) => void;
  options?: MenuOptionsPopoverDataProps[];
  showShimmer?: boolean;
  isEmailVerified: boolean;
  onResendEmail: VoidFunction;
}

const TeacherClassList: React.FC<TeacherClassListPops> = ({
  data = [],
  onFabClick,
  onClassClick,
  showShimmer = false,
  onAction = () => null,
  isEmailVerified = true,
  onResendEmail,
}): JSX.Element => {
  if (!isEmailVerified)
    return <EmailVerificationNotice show onResendEmail={onResendEmail} />;

  if (data.length === 0)
    return <EmptyClass onFabClick={onFabClick} userRole={UserRole.TEACHER} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(info, index) => info.classId ?? `class-${index}`}
        renderItem={({ item }) => (
          <TeacherClassCard
            data={{
              title: item.title,
              section: item.section,
              classCode: item.classCode,
              totalStudent: item.totalStudent,
              isLive: item.isLive ?? false,
              classIcon: item.classIcon,
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

export default TeacherClassList;

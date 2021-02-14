import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { lightColor } from '../../../../util/Colors';
import StudentPresentListItem from '../../../molecules/StudentPresentListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColor,
  },
});

export interface SessionStudentListDataProps {
  // TODO: we really should use studentId for this kind of key
  key: string;
  name: string;
  rollNo: string;
  present: boolean;
}

export interface EditAttendanceSessionPops {
  studentList: SessionStudentListDataProps[];
  onPresentChange: (studentId: string, present: boolean) => Promise<void>;
}

const EditAttendanceSession: React.FC<EditAttendanceSessionPops> = ({
  studentList,
  onPresentChange,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <FlatList
        data={studentList}
        renderItem={({ item }) => {
          return (
            <StudentPresentListItem
              name={item.name}
              rollNo={item.rollNo}
              present={item.present}
              onPresentChange={async present => {
                await onPresentChange(item.key, present);
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default EditAttendanceSession;

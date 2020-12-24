import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { lightColor } from '../../../../util/Colors';
import StudentListItem from '../../../molecules/StudentListItem';
import { StudentListData } from '../StudentList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColor,
    paddingHorizontal: 16,
  },
});

export interface AttendanceRecordStudentListPops {
  studentList?: StudentListData[];
  onProfileClick?: (rollNo: string) => void;
}

const AttendanceRecordStudentList: React.FC<AttendanceRecordStudentListPops> = ({
  studentList = [],
  onProfileClick = () => null,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <FlatList
        data={studentList}
        renderItem={data => (
          <StudentListItem
            onProfileClick={() => onProfileClick(data.item.rollNo)}
            name={data.item.name}
            rollNo={data.item.rollNo}
            checked={data.item.checked}
            percentage={data.item.percentage}
          />
        )}
      />
    </View>
  );
};

export default AttendanceRecordStudentList;

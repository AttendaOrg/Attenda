import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { lightColor } from '../../../../util/Colors';
import StudentListItem from '../../../molecules/StudentListItem';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: lightColor,
    flex: 1,
  },
});

export interface StudentListData {
  name: string;
  rollNo: string;
  checked: boolean;
  percentage?: string;
  // TODO: make it studentId fot good reference
  key: string;
}

export interface StudentListPops {
  studentList?: StudentListData[];
  onChangeChecked: (rollNo: string, checked: boolean) => void;
  showChecked?: boolean;
  onChangeShowChecked: (active: boolean) => void;
  onProfileClick: (studentId: string) => void;
}

const StudentList: React.FC<StudentListPops> = ({
  studentList = [],
  onChangeChecked,
  showChecked = false,
  onChangeShowChecked,
  onProfileClick,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <FlatList
        extraData={showChecked}
        data={studentList}
        renderItem={data => (
          <StudentListItem
            onLogPress={() => {
              onChangeShowChecked(true);
              onChangeChecked(data.item.rollNo, !data.item.checked);
            }}
            onProfileClick={() => onProfileClick(data.item.key)}
            showChecked={showChecked}
            name={data.item.name}
            rollNo={data.item.rollNo}
            checked={data.item.checked}
            percentage={data.item.percentage}
            onChangeChecked={() =>
              onChangeChecked(data.item.rollNo, !data.item.checked)
            }
          />
        )}
      />
    </View>
  );
};

export default StudentList;

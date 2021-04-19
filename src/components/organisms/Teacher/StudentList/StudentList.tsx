import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { lightColor } from '../../../../util/Colors';
import Shimmer from '../../../atoms/Shimmer/Shimmer';
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
  profilePicUrl?: string;
}

export interface StudentListPops {
  studentList?: StudentListData[];
  onChangeChecked: (rollNo: string, checked: boolean) => void;
  showChecked?: boolean;
  onChangeShowChecked: (active: boolean) => void;
  onProfileClick: (studentId: string) => void;
  showShimmer?: boolean;
  preloadStudentCount?: number;
}

const StudentList: React.FC<StudentListPops> = ({
  studentList = [],
  onChangeChecked,
  showChecked = false,
  onChangeShowChecked,
  onProfileClick,
  showShimmer = false,
  preloadStudentCount = 0,
}): JSX.Element => {
  if (showShimmer)
    return (
      <View style={styles.container}>
        <FlatList
          data={new Array(preloadStudentCount || 5)
            .fill(preloadStudentCount)
            .map((_, i) => ({
              key: `shimmer-${i}`,
            }))}
          renderItem={() => (
            <View style={{ padding: 4 }}>
              <Shimmer width="100%" height={46} />
            </View>
          )}
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        extraData={{ showChecked, studentList }}
        data={studentList}
        renderItem={data => (
          <StudentListItem
            avatar={{ uri: data.item.profilePicUrl, height: 34, width: 34 }}
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

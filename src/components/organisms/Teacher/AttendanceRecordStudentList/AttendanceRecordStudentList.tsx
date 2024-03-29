import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { lightColor } from '../../../../util/Colors';
import Shimmer from '../../../atoms/Shimmer/Shimmer';
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
  onProfileClick?: (studentId: string) => void;
  showShimmer: boolean;
  totalStudentCount: number;
}

const AttendanceRecordStudentList: React.FC<AttendanceRecordStudentListPops> = ({
  studentList = [],
  onProfileClick = () => null,
  showShimmer = false,
  totalStudentCount,
}): JSX.Element => {
  if (showShimmer)
    return (
      <View style={styles.container}>
        <FlatList
          data={new Array(totalStudentCount).fill(1).map((_, i) => ({
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
        data={studentList}
        renderItem={data => {
          const isInvalidPic =
            data.item.profilePicUrl === undefined ||
            data.item.profilePicUrl === null ||
            data.item.profilePicUrl === '';

          console.log(`isValidPic ${isInvalidPic}`, data.item);

          return (
            <StudentListItem
              avatar={
                isInvalidPic
                  ? undefined
                  : { height: 34, width: 34, uri: data.item.profilePicUrl }
              }
              onProfileClick={() => onProfileClick(data.item.key)}
              name={data.item.name}
              rollNo={data.item.rollNo}
              checked={data.item.checked}
              percentage={data.item.percentage}
            />
          );
        }}
      />
    </View>
  );
};

export default AttendanceRecordStudentList;

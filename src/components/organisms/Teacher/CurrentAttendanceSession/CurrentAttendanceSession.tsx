import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { lightColor } from '../../../../util/Colors';
import DoubleButtonPopup from '../../../molecules/DoubleButtonPopup';
import StudentPresentListItem from '../../../molecules/StudentPresentListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColor,
  },
  summeryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export interface CurrentAttendanceSessionDataProps {
  key: string;
  name: string;
  rollNo: string;
  present: boolean;
}

export interface CurrentAttendanceSessionPops {
  studentList?: CurrentAttendanceSessionDataProps[];
  onPresentChange?: (rollNo: string, present: boolean) => void;
  showPopup: boolean;
  onDismissPopup: () => void;
  onPositivePopupClick: () => void;
}

const CurrentAttendanceSession: React.FC<CurrentAttendanceSessionPops> = ({
  studentList = [],
  onPresentChange = () => null,
  onDismissPopup,
  onPositivePopupClick,
  showPopup,
}): JSX.Element => {
  const present = studentList.filter(item => item.present).length;
  const absent = studentList.length - present;

  return (
    <View style={styles.container}>
      <View style={styles.summeryContainer}>
        <Text>Present: {present}</Text>
        <Text>Absent: {absent}</Text>
      </View>
      <FlatList
        data={studentList}
        renderItem={({ item }) => (
          <StudentPresentListItem
            name={item.name}
            rollNo={item.rollNo}
            present={item.present}
            onPresentChange={async _present => {
              await onPresentChange(item.rollNo, _present);
            }}
          />
        )}
      />

      <DoubleButtonPopup
        visible={showPopup}
        title="Stop this session"
        text="Are you sure to stop? "
        positiveButtonText="Ok"
        negativeButtonText="Cancel"
        onNegativeButtonClick={onDismissPopup}
        onPositiveButtonClick={onPositivePopupClick}
        onDismiss={onDismissPopup}
      />
    </View>
  );
};

export default CurrentAttendanceSession;

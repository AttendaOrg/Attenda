import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MarkTime } from '../../organisms/Student/AttendanceRecord';

const styles = StyleSheet.create({
  container: {},
  row: {
    padding: 7,
    paddingHorizontal: 18,
    flexDirection: 'row',
  },
  headerColor: {
    color: '#ffffff',
  },
  center: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyContainer: {
    maxHeight: 200,
    overflow: 'scroll',
  },
});

export interface UserPresentPops {
  date: string;
  selectedDates: MarkTime;
}

const UserPresent: React.FC<UserPresentPops> = ({
  date,
  selectedDates,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View
        style={[
          { backgroundColor: '#985EFF', justifyContent: 'center', flex: 1 },
          styles.row,
        ]}
      >
        <Text style={styles.headerColor}>Attendance Record ({date})</Text>
      </View>
      <View style={styles.bodyContainer}>
        {Object.entries(selectedDates).map(selectedDate => {
          const [sDate, present] = selectedDate;

          return (
            <TouchableOpacity key={sDate}>
              <View style={[styles.row, styles.center]}>
                <Text>{sDate}</Text>
                {present.active ? (
                  <MaterialIcons name="check" color="green" size={18} />
                ) : (
                  <MaterialIcons name="cancel" color="red" size={18} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default UserPresent;

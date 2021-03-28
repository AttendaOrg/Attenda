import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MarkTime } from '../../organisms/Student/AttendanceRecord';

const styles = StyleSheet.create({
  container: {},
  row: {
    padding: 7,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerColor: {
    color: '#ffffff',
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
      <View style={[{ backgroundColor: '#985EFF' }, styles.row]}>
        <Text style={styles.headerColor}>Attendance Record ({date})</Text>
      </View>
      {Object.entries(selectedDates).map(selectedDate => {
        const [sDate, present] = selectedDate;

        return (
          <TouchableOpacity key={sDate}>
            <View style={styles.row}>
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
  );
};

export default UserPresent;

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { lightColor } from '../../../util/Colors';

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    backgroundColor: '#985EFF',
    justifyContent: 'flex-start',
    padding: 7,
    paddingHorizontal: 12,
  },
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
  center: {
    justifyContent: 'center',
  },
  btnBack: {
    marginRight: 8,
  },
});

interface SelectedDate {
  [date: string]: boolean;
}

export interface UserPresentEditPopupPops {
  date: string;
  selectedDates: SelectedDate;
  onChangeAttendance: (date: string, time: string, status: boolean) => void;
}

const UserPresentEditPopup: React.FC<UserPresentEditPopupPops> = ({
  date,
  selectedDates,
  onChangeAttendance = () => null,
}): JSX.Element => {
  const [editing, setEditing] = useState<string | null>(null);

  // if the editing value is null that means the use did not chose any time
  const title = editing ? (
    <View style={[styles.header]}>
      <TouchableOpacity style={styles.btnBack} onPress={() => setEditing(null)}>
        <MaterialIcons name="arrow-back" size={18} color={lightColor} />
      </TouchableOpacity>
      <Text style={styles.headerColor}>
        Change Present ({date} {editing})
      </Text>
    </View>
  ) : (
    <View style={[styles.header]}>
      <Text style={styles.headerColor}>Select A Time ({date})</Text>
    </View>
  );

  // if the editing value is null that means the use did not chose any time
  const body = editing ? (
    <View>
      <TouchableOpacity onPress={() => onChangeAttendance(date, editing, true)}>
        <View style={[styles.row, styles.center]}>
          <Text style={{ color: 'green' }}>Present</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onChangeAttendance(date, editing, false)}
      >
        <View style={[styles.row, styles.center]}>
          <Text style={{ color: 'red' }}>Absent</Text>
        </View>
      </TouchableOpacity>
    </View>
  ) : (
    Object.entries(selectedDates).map(selectedDate => {
      const [sDate, present] = selectedDate;

      return (
        <TouchableOpacity key={sDate} onPress={() => setEditing(sDate)}>
          <View style={styles.row}>
            <Text>{sDate}</Text>
            {present ? (
              <MaterialIcons name="check" color="green" size={18} />
            ) : (
              <MaterialIcons name="cancel" color="red" size={18} />
            )}
          </View>
        </TouchableOpacity>
      );
    })
  );

  return (
    <View style={styles.container}>
      {title}
      {body}
    </View>
  );
};

export default UserPresentEditPopup;

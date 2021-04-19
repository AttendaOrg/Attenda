import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { lightColor } from '../../../util/Colors';
import { MarkTime } from '../../organisms/Student/AttendanceRecord';

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
    textAlign: 'center',
    flex: 1,
  },
  center: {
    justifyContent: 'center',
  },
  btnBack: {
    marginRight: 8,
  },
  bodyContainer: {
    maxHeight: 200,
  },
});

export interface UserPresentEditPopupProps {
  date: string;
  selectedDates: MarkTime[];
  onChangeAttendance: (sessionId: string, status: boolean) => void;
}

const UserPresentEditPopup: React.FC<UserPresentEditPopupProps> = ({
  date,
  selectedDates,
  onChangeAttendance = () => null,
}): JSX.Element => {
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);

  const selectedTime = selectedDates
    .filter(e => Object.values(e)[0].sessionId === editingSessionId)
    .map(e => Object.keys(e)[0])[0];

  // if the editing value is null that means the use did not chose any time
  const title =
    editingSessionId !== null ? (
      <View style={[styles.header]}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => setEditingSessionId(null)}
        >
          <MaterialIcons name="arrow-back" size={18} color={lightColor} />
        </TouchableOpacity>
        <Text style={styles.headerColor}>
          Change Present ({date} {selectedTime})
        </Text>
      </View>
    ) : (
      <View style={[styles.header, styles.center]}>
        <Text style={styles.headerColor}>Select A Time ({date})</Text>
      </View>
    );

  // if the editing value is null that means the use did not chose any time
  const body =
    editingSessionId !== null ? (
      <View>
        <TouchableOpacity
          onPress={() => onChangeAttendance(editingSessionId, true)}
        >
          <View style={[styles.row, styles.center]}>
            <Text style={{ color: 'green' }}>Present</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChangeAttendance(editingSessionId, false)}
        >
          <View style={[styles.row, styles.center]}>
            <Text style={{ color: 'red' }}>Absent</Text>
          </View>
        </TouchableOpacity>
      </View>
    ) : (
      <FlatList
        style={styles.bodyContainer}
        data={selectedDates}
        keyExtractor={e => Object.values(e)[0].sessionId}
        renderItem={selectedDate => {
          const [time, { active, sessionId }] = Object.entries(
            selectedDate.item,
          )[0];

          return (
            <TouchableOpacity
              key={time}
              onPress={() => setEditingSessionId(sessionId)}
            >
              <View style={styles.row}>
                <Text>{time}</Text>
                {active ? (
                  <MaterialIcons name="check" color="green" size={18} />
                ) : (
                  <MaterialIcons name="cancel" color="red" size={18} />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );

  return (
    <View style={styles.container}>
      {title}
      {body}
    </View>
  );
};

export default UserPresentEditPopup;

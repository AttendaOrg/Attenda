import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MarkTime } from '../../organisms/Student/AttendanceRecord';

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    backgroundColor: '#985EFF',
    justifyContent: 'center',
    padding: 7,
  },
  row: {
    padding: 7,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ddd',

    minHeight: 36,
  },
  headerColor: {
    color: '#ffffff',
  },
  timeText: {
    textAlign: 'center',
  },
  listContainer: {
    maxHeight: 200,
  },
});

export interface SelectTimeEditPopupProps {
  date: string;
  selectedDateTimes: MarkTime[];
  onSelectTime: (sessionId: string) => void;
}

const SelectTimeEditPopup: React.FC<SelectTimeEditPopupProps> = ({
  date,
  onSelectTime,
  selectedDateTimes,
}): JSX.Element => {
  const body = selectedDateTimes.map(selectedTime => {
    const [{ sessionId }] = Object.values(selectedTime);
    const [time] = Object.keys(selectedTime);

    return (
      <TouchableOpacity
        key={sessionId}
        onPress={() => onSelectTime(sessionId)}
        style={styles.row}
      >
        <Text style={styles.timeText}>{time}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text style={styles.headerColor}>Select A Time ({date})</Text>
      </View>
      <FlatList
        style={styles.listContainer}
        data={selectedDateTimes}
        keyExtractor={e => Object.values(e)[0].sessionId}
        renderItem={selectedTime => {
          const [{ sessionId }] = Object.values(selectedTime.item);
          const [time] = Object.keys(selectedTime.item);

          return (
            <TouchableOpacity
              key={sessionId}
              onPress={() => onSelectTime(sessionId)}
              style={styles.row}
            >
              <Text style={styles.timeText}>{time}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SelectTimeEditPopup;

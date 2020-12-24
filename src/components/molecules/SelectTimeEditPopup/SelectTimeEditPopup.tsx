import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
});

export interface SelectTimeEditPopupProps {
  date: string;
  selectedDateTimes: string[];
  onSelectTime: (date: string, time: string) => void;
}

const SelectTimeEditPopup: React.FC<SelectTimeEditPopupProps> = ({
  date,
  onSelectTime,
  selectedDateTimes,
}): JSX.Element => {
  const body = selectedDateTimes.map(selectedTime => {
    return (
      <TouchableOpacity
        key={selectedTime}
        onPress={() => onSelectTime(date, selectedTime)}
        style={styles.row}
      >
        <Text style={styles.timeText}>{selectedTime}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text style={styles.headerColor}>Select A Time ({date})</Text>
      </View>
      {body}
    </View>
  );
};

export default SelectTimeEditPopup;

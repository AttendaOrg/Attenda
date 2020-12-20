import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import { Dialog } from 'react-native-paper';
import { lightColor } from '../../../../util/Colors';
import SelectTimeEditPopup from '../../../molecules/SelectTimeEditPopup';
import { MarkedDates } from '../../Student/AttendanceRecord';
import { convertData, convertDateFormat } from '../EditStudentAttendanceRecord';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColor,
  },
});

export interface AttendanceSessionRecordPops {
  markedDates: MarkedDates;
  onMonthChange: (date: Date) => void;
  onTimeSelect: (date: string, time: string) => void;
}

const AttendanceSessionRecord: React.FC<AttendanceSessionRecordPops> = ({
  markedDates,
  onTimeSelect,
  onMonthChange,
}): JSX.Element => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>('');
  const mDates = convertData(markedDates);

  const onDateClick = (date: DateObject) => {
    const cDate = convertDateFormat(new Date(date.dateString));

    setCurrentDate(cDate);
    setPopupVisible(markedDates[cDate] !== undefined);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onMonthChange={date => onMonthChange(new Date(date.dateString))}
        onDayPress={onDateClick}
        markedDates={mDates}
        markingType="multi-dot"
      />
      <Dialog visible={popupVisible} onDismiss={() => setPopupVisible(false)}>
        <SelectTimeEditPopup
          date={currentDate}
          selectedDateTimes={Object.keys(markedDates[currentDate] || {})}
          onSelectTime={(date, time) => {
            setPopupVisible(false);
            onTimeSelect(date, time);
            setCurrentDate('');
            // dismiss the popup
          }}
        />
      </Dialog>
    </View>
  );
};

export default AttendanceSessionRecord;
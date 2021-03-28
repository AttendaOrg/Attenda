import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import { Dialog } from 'react-native-paper';
import {
  convertDateFormat,
  convertMarkedDateToTimes,
  padNumber,
} from '../../../../util';
import { lightColor } from '../../../../util/Colors';
import ClassDetails from '../../../molecules/ClassDetails';
import SelectTimeEditPopup from '../../../molecules/SelectTimeEditPopup';
import { MarkedDates } from '../../Student/AttendanceRecord';
import { convertData } from '../EditStudentAttendanceRecord';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColor,
  },
});

export interface AttendanceSessionRecordPops {
  className: string;
  section: string;
  markedDates: MarkedDates;
  onMonthChange: (date: Date) => void;
  onTimeSelect: (sessionId: string) => void;
}

const AttendanceSessionRecord: React.FC<AttendanceSessionRecordPops> = ({
  markedDates,
  onTimeSelect,
  onMonthChange,
  className,
  section,
}): JSX.Element => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>('');
  const mDates = convertData(markedDates);

  const onDateClick = (date: DateObject) => {
    const times = Object.keys(markedDates)
      .filter(
        dt =>
          dt === `${date.year}-${padNumber(date.month)}-${padNumber(date.day)}`,
      )
      .map(dt => markedDates[dt])
      .map(time => Object.keys(time))
      .filter(dt => dt)
      .flat();

    if (times.length === 1) {
      const [[, _timeObj]] = Object.entries(markedDates);
      const [{ sessionId }] = Object.values(_timeObj);

      onTimeSelect(sessionId);

      return;
    }
    const cDate = convertDateFormat(new Date(date.dateString));

    setCurrentDate(cDate);
    setPopupVisible(markedDates[cDate] !== undefined);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ClassDetails className={className} section={section} />
        <Calendar
          onMonthChange={date => onMonthChange(new Date(date.dateString))}
          onDayPress={onDateClick}
          markedDates={mDates}
          markingType="multi-dot"
        />
      </ScrollView>
      <Dialog visible={popupVisible} onDismiss={() => setPopupVisible(false)}>
        <SelectTimeEditPopup
          date={currentDate}
          selectedDateTimes={convertMarkedDateToTimes(markedDates, currentDate)}
          onSelectTime={classId => {
            setPopupVisible(false);
            onTimeSelect(classId);
            setCurrentDate('');
            // dismiss the popup
          }}
        />
      </Dialog>
    </View>
  );
};

export default AttendanceSessionRecord;

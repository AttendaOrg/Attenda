import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Calendar, DateObject, MultiDotMarking } from 'react-native-calendars';
import { Dialog } from 'react-native-paper';
import { convertDateFormat } from '../../../../util';
import ClassDetails, {
  ClassDetailsPops,
} from '../../../molecules/ClassDetails';
import UserPresent from '../../../molecules/UserPresentPopup';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  percentageContainer: {
    // alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  percentageText: {
    fontWeight: 'bold',
    padding: 8,
    fontSize: 16,
    paddingRight: 0,
  },
  percentageLabel: {
    color: '#000',
  },
  percentageValue: {
    color: 'green',
  },
});

export const presentDot = { key: 'present', color: 'green' };
export const absentDot = { key: 'absent', color: 'red' };

export interface MarkTime {
  [time: string]: {
    active: boolean;
    sessionId: string;
  };
}

export interface MarkedDates {
  [date: string]: MarkTime;
}

export interface AttendanceRecordPops extends ClassDetailsPops {
  markedDates: MarkedDates;
  onMonthChange: (date: Date) => void;
  percentage: string;
}

export const limitMultiDot = (
  multiDotMarking: MultiDotMarking,
  limit = 3,
): MultiDotMarking => {
  const newObj: MultiDotMarking = { ...multiDotMarking };

  const newDots = multiDotMarking.dots.filter((_, i) => i < limit);

  newObj.dots = newDots;

  return newObj;
};

export const limitMarkDate = (
  markedDates: MarkedDatesProps,
  limit = 3,
): MarkedDatesProps => {
  const newObj: MarkedDatesProps = {};

  Object.keys(markedDates).forEach(dateKey => {
    const val: MultiDotMarking = markedDates[dateKey];

    // for every date limit how many dot it's show
    newObj[dateKey] = limitMultiDot(val, limit);
  });

  return newObj;
};

export interface MarkedDatesProps {
  [date: string]: MultiDotMarking;
}

const convertData = (markedDates: MarkedDates = {}): MarkedDatesProps => {
  const newDates: MarkedDatesProps = {};

  Object.keys(markedDates).forEach(markDateKey => {
    const markDate = markedDates[markDateKey];

    const dots = Object.values(markDate).map(times =>
      times.active
        ? // for some reason present key is duplicating
          { ...presentDot, key: `present-${markDateKey}-${Math.random()}` }
        : absentDot,
    );

    newDates[markDateKey] = { dots };
  });

  return newDates;
};

const AttendanceRecord: React.FC<AttendanceRecordPops> = ({
  markedDates,
  className,
  rollNo,
  section,
  teacherName,
  percentage,
  onMonthChange = () => null,
}): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>('');

  const onDateClick = (date: DateObject) => {
    const cDate = convertDateFormat(new Date(date.dateString));

    setCurrentDate(cDate);
    setVisible(markedDates[cDate] !== undefined);
  };

  const mDates = convertData(markedDates);

  console.log('limitMarkDate(', limitMarkDate(mDates));

  return (
    <View style={styles.container}>
      <ScrollView>
        <ClassDetails
          className={className}
          section={section}
          teacherName={teacherName}
          rollNo={rollNo}
        />
        <View style={styles.percentageContainer}>
          <Text style={[styles.percentageText, styles.percentageLabel]}>
            Attendance:
          </Text>
          <Text style={[styles.percentageText, styles.percentageValue]}>
            {percentage}
          </Text>
        </View>
        <Calendar
          onMonthChange={date => onMonthChange(new Date(date.dateString))}
          onDayPress={onDateClick}
          markedDates={limitMarkDate(mDates)}
          markingType="multi-dot"
        />
      </ScrollView>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <UserPresent
          date="2020-12-12"
          selectedDates={markedDates[currentDate] ?? {}}
        />
      </Dialog>
    </View>
  );
};

export default AttendanceRecord;

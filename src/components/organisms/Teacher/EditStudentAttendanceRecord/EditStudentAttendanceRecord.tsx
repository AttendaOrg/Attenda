import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import { Dialog } from 'react-native-paper';
import { convertDateFormat, convertMarkedDateToTimes } from '../../../../util';
import UserInfo, { UserInfoPops } from '../../../molecules/UserInfo';
import UserPresentEditPopup from '../../../molecules/UserPresentEditPopup';
import {
  MarkedDates,
  absentDot,
  presentDot,
  MarkedDatesProps,
  limitMarkDate,
} from '../../Student/AttendanceRecord';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  percentageContainer: {
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

export const convertData = (
  markedDates: MarkedDates = {},
): MarkedDatesProps => {
  const newDates: MarkedDatesProps = {};

  Object.keys(markedDates).forEach(markDateKey => {
    const markDate = markedDates[markDateKey];

    const dots = Object.values(markDate).map(active =>
      active.active
        ? // for some reason present key is duplicating
          { ...presentDot, key: `present-${markDateKey}-${Math.random()}` }
        : { ...absentDot, key: `absent-${markDateKey}-${Math.random()}` },
    );

    newDates[markDateKey] = { dots };
  });

  return newDates;
};

export interface EditStudentAttendanceRecordPops {
  markedDates: MarkedDates;
  onMonthChange: (date: Date) => void;
  percentage: string;
  onChangeAttendance: (sessionId: string, status: boolean) => Promise<void>;
  userInfo: UserInfoPops;
}

const EditStudentAttendanceRecord: React.FC<EditStudentAttendanceRecordPops> = ({
  markedDates,
  percentage,
  onMonthChange,
  onChangeAttendance,
  userInfo,
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
      <ScrollView>
        <UserInfo
          userImage={userInfo.userImage}
          name={userInfo.name}
          onRollChange={userInfo.onRollChange}
          rollNo={userInfo.rollNo}
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
      <Dialog visible={popupVisible} onDismiss={() => setPopupVisible(false)}>
        <UserPresentEditPopup
          date={currentDate}
          selectedDates={convertMarkedDateToTimes(markedDates, currentDate)}
          onChangeAttendance={async (sessionId, status) => {
            await onChangeAttendance(sessionId, status);
            setCurrentDate('');
            // dismiss the popup
            setPopupVisible(false);
          }}
        />
      </Dialog>
    </View>
  );
};

export default EditStudentAttendanceRecord;

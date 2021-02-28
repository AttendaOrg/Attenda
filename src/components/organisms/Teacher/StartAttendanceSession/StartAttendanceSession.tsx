/* eslint-disable global-require */
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import KeyboardAdjustImageView from '../../../templates/KeyboardAdjustImageView';
import { convertDate, convertTime } from '../../../../util';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
    backgroundColor: '#fff',
  },
  inputStyle: {
    fontSize: 14,
    marginTop: 15,
  },
  btnContainerStyle: {
    alignItems: 'center',
    marginTop: 25,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  sectionText: {
    marginVertical: 8,
    marginTop: 0,
    textAlign: 'center',
  },
});

export interface StartAttendanceSessionPops {
  title: string;
  onStartSession: (date: Date) => void;
  section: string;
}

const StartAttendanceSession: React.FC<StartAttendanceSessionPops> = ({
  onStartSession,
  title,
  section,
}): JSX.Element => {
  const [dateTime, setDateTime] = useState(new Date());
  const [showDatePopup, setShowDatePopup] = useState(false);
  const [showTimePopup, setShowTimePopup] = useState(false);

  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView
        imageSource={require('../../../../../assets/images/startAttendanceSession.png')}
      />
      <View>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.sectionText}>{section}</Text>
        <View style={styles.timeContainer}>
          <TouchableOpacity
            style={{ flex: 1, marginRight: 6 }}
            onPress={() => {
              setShowDatePopup(true);
            }}
          >
            <TextInput
              disabled
              value={convertDate(dateTime)}
              label="Date"
              placeholder="01/01/2020"
              // testID="input"
              mode="outlined"
              theme={{
                colors: {
                  placeholder: 'grey',
                  background: '#fff',
                  text: 'black',
                  primary: 'grey',
                },
              }}
              style={styles.inputStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, marginLeft: 6 }}
            onPress={() => {
              setShowTimePopup(true);
            }}
          >
            <TextInput
              disabled
              value={convertTime(dateTime)}
              label="Time"
              placeholder="01:50 pm"
              // testID="input"
              mode="outlined"
              theme={{
                colors: {
                  placeholder: 'grey',
                  background: '#fff',
                  text: 'black',
                  primary: 'grey',
                },
              }}
              style={styles.inputStyle}
            />
          </TouchableOpacity>
        </View>

        {showDatePopup && (
          <DateTimePicker
            value={dateTime}
            testID="dateTimePicker"
            mode="date"
            display="default"
            onChange={(_evt, d) => {
              setShowDatePopup(false);
              if (d) setDateTime(d);
            }}
          />
        )}

        {showTimePopup && (
          <DateTimePicker
            value={dateTime}
            testID="dateTimePicker"
            mode="time"
            display="default"
            onChange={(_evt, t) => {
              setShowTimePopup(false);
              if (t) setDateTime(t);
            }}
          />
        )}
      </View>
      <View style={styles.btnContainerStyle}>
        <Button
          style={{ width: '60%' }}
          mode="contained"
          color="#2196f3"
          onPress={() => onStartSession(dateTime)}
        >
          Start a session
        </Button>
      </View>
    </View>
  );
};

export default StartAttendanceSession;

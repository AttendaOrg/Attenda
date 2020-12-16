/* eslint-disable global-require */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Input } from 'react-native-elements';
import { inputContainerStyle } from '../../../../util/Styles';
import KeyboardAdjustImageView from '../../../templates/KeyboardAdjustImageView';

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
});

export interface StartAttendanceSessionPops {
  date: string;
  onDateChange: (date: string) => void;
  time: string;
  onTimeChange: (section: string) => void;
  onStartSession: () => void;
}

const CreateClass: React.FC<StartAttendanceSessionPops> = ({
  date,
  onDateChange,
  time,
  onTimeChange,
  onStartSession,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView
        imageSource={require('../../../../../assets/images/startAttendanceSession.png')}
      />
      <View>
        <TextInput
          value={date}
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
          onChangeText={onDateChange}
        />
        <TextInput
          value={time}
          label="Time"
          placeholder="01.50 pm"
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
          onChangeText={onTimeChange}
        />
      </View>
      <View style={styles.btnContainerStyle}>
        <Button
          style={{ width: '60%' }}
          mode="contained"
          color="#2196f3"
          onPress={onStartSession}
        >
          Start a session
        </Button>
      </View>
    </View>
  );
};

export default CreateClass;

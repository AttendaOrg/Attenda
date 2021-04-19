import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { inputContainerStyle } from '../../../../util/Styles';
import JoinClassImageComponent from '../../../atoms/Images/JoinClassImageComponent';
import KeyboardAdjustImageView from '../../../templates/KeyboardAdjustImageView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputStyle: {
    fontSize: 14,
    minHeight: 34,
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
});

export interface JoinClassFormPops {
  joinCode?: string;
  onSubmit: (classCode: string, rollNo: string) => void;
}

const JoinClassForm: React.FC<JoinClassFormPops> = ({
  onSubmit,
  joinCode = '',
}): JSX.Element => {
  const [classCode, setClassCode] = useState(joinCode);
  const [jonCodeError, setJonCodeError] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [rollNoError, setRollNoError] = useState('');

  const onClassCodeChangeText = (text: string) => {
    if (text === '') {
      setJonCodeError('Class code can not be empty');
    } else if (jonCodeError !== '') {
      setJonCodeError('');
    }
    setClassCode(text);
  };

  const onRollNoChangeText = (text: string) => {
    if (text === '') {
      setRollNoError('Roll no can not be empty');
    } else if (rollNoError !== '') {
      setRollNoError('');
    }
    setRollNo(text);
  };

  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView
        heightSensitive
        svgImg={JoinClassImageComponent}
      />
      {!joinCode && (
        <Input
          placeholder="Class Code"
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          labelStyle={{ margin: 0 }}
          errorStyle={{ margin: 0 }}
          onChangeText={onClassCodeChangeText}
          errorMessage={jonCodeError}
        />
      )}

      <Input
        placeholder="Your Roll No"
        containerStyle={inputContainerStyle}
        style={styles.inputStyle}
        onChangeText={onRollNoChangeText}
        errorMessage={rollNoError}
      />

      <View style={styles.buttonContainer}>
        <Button
          style={{ width: '30%' }}
          mode="contained"
          color="#2196f3"
          onPress={() => {
            if ((joinCode || classCode) && rollNo) {
              onSubmit(joinCode || classCode, rollNo);
            }
            if (classCode === '') {
              setJonCodeError('Class code can not be empty.');
            }
            if (rollNo === '') {
              setRollNoError('Roll no can not be empty');
            }
          }}
        >
          DONE
        </Button>
      </View>
    </View>
  );
};

export default JoinClassForm;

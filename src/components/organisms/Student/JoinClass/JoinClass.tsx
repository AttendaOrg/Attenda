import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import TeacherClassModel from '../../../../api/TeacherApi/model/TeacherClassModel';
import { inputContainerStyle } from '../../../../util/Styles';
import JoinClassImageComponent from '../../../atoms/Images/JoinClassImageComponent';
import KeyboardAdjustImageView from '../../../templates/KeyboardAdjustImageView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  classNameText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  sectionText: {
    marginVertical: 4,
    fontSize: 15,
    color: '#6A6A6A',
  },
  teacherNameText: {
    // fontSize: 15,
    fontWeight: '600',
  },
  danger: {
    color: 'red',
    marginTop: 4,
  },
  inputStyle: {
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginVertical: 6,
  },
});

export interface JoinClassProps {
  classInfo: TeacherClassModel | null;
  resetNoClassFound: () => void;
  noClassFound: boolean;
  onGetClassCode: (classCode: string) => void;
  onJoinClass: (rollNo: string) => void;
}

const JoinClass: React.FC<JoinClassProps> = ({
  classInfo,
  onJoinClass,
  onGetClassCode = () => null,
  resetNoClassFound = () => null,
  noClassFound = false,
}): JSX.Element => {
  const [classCode, setClassCode] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [jonCodeError, setJonCodeError] = useState('');
  const [rollNoError, setRollNoError] = useState('');

  useEffect(() => {
    console.log(`${noClassFound}`);

    if (noClassFound)
      setJonCodeError(`There is no class with the class code "${classCode}"`);
    else setJonCodeError('');
  }, [classCode, noClassFound]);

  const onClassCodeChangeText = (text: string) => {
    resetNoClassFound();
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

  const classInfoBody = (
    <>
      <Text style={styles.classNameText}>{classInfo?.title}</Text>
      <Text style={styles.sectionText}>{classInfo?.section}</Text>
      <Text style={styles.teacherNameText}>
        {classInfo?.teacherName?.length !== 0 && `By:${classInfo?.teacherName}`}
      </Text>
      {classInfo?.isActiveInvite === false && (
        <Text style={styles.danger}>
          This class does not have active invite
        </Text>
      )}
      <Input
        placeholder="Your Roll No"
        style={styles.inputStyle}
        onChangeText={onRollNoChangeText}
        errorMessage={rollNoError}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          color="#2196f3"
          disabled={classInfo?.isActiveInvite === false}
          onPress={() => {
            if (rollNo === '') {
              setRollNoError('Roll no can not be empty.');
            } else {
              onJoinClass(rollNo);
            }
          }}
        >
          Join
        </Button>
      </View>
    </>
  );

  const getRollNoBody = (
    <>
      <Input
        placeholder="Class Code"
        containerStyle={inputContainerStyle}
        style={styles.inputStyle}
        labelStyle={{ margin: 0 }}
        errorStyle={{ margin: 0 }}
        onChangeText={onClassCodeChangeText}
        errorMessage={jonCodeError}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          color="#2196f3"
          onPress={() => {
            if (classCode === '') {
              setJonCodeError('Class code can not be empty.');
            } else {
              onGetClassCode(classCode);
            }
          }}
        >
          Next
        </Button>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView svgImg={JoinClassImageComponent} />
      {classInfo === null ? getRollNoBody : classInfoBody}
    </View>
  );
};

export default JoinClass;

import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
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
    fontSize: 16,
    fontWeight: '600',
  },
  sectionText: {
    marginVertical: 4,
    color: '#6A6A6A',
  },
  teacherNameText: {
    fontWeight: '600',
  },
  btnContainer: {
    marginTop: 8,
    width: '50%',
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSrc = require('../../../../../assets/images/study.png');

export interface JoinClassPops {
  className: string;
  section: string;
  teacher: string;
}

const JoinClass: React.FC<JoinClassPops> = ({
  className,
  section,
  teacher,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView imageSource={imageSrc} />
      <Text style={styles.classNameText}>{className}</Text>
      <Text style={styles.sectionText}>{section}</Text>
      <Text style={styles.teacherNameText}>By: {teacher}</Text>
      <View style={styles.btnContainer}>
        <Button title="Join" onPress={() => null} />
      </View>
    </View>
  );
};

export default JoinClass;

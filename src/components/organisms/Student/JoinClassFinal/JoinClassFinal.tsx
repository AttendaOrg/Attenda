import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
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
  btnContainer: {
    marginTop: 15,
    width: '50%',
  },
});

export interface JoinClassFinalPops {
  className: string;
  section: string;
  teacher: string;
  onDone: () => void;
}

const JoinClassFinal: React.FC<JoinClassFinalPops> = ({
  className,
  section,
  teacher,
  onDone,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView svgImg={JoinClassImageComponent} />
      <Text style={styles.classNameText}>{className}</Text>
      <Text style={styles.sectionText}>{section}</Text>
      <Text style={styles.teacherNameText}>By: {teacher}</Text>
      <View style={styles.btnContainer}>
        <Button title="Join" onPress={onDone} />
      </View>
    </View>
  );
};

export default JoinClassFinal;

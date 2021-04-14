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
  danger: {
    color: 'red',
    marginTop: 4,
  },
});

export interface JoinClassFinalPops {
  className: string;
  section: string;
  teacher: string;
  onDone: () => void;
  disableJoin: boolean;
}

interface JoinClassFinalNoClassFoundProps {
  goBack: () => void;
  classCode: string;
}

export const JoinClassFinalNoClassFound: React.FC<JoinClassFinalNoClassFoundProps> = ({
  classCode,
  goBack,
}) => {
  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView svgImg={JoinClassImageComponent} />
      <Text style={styles.danger}>
        There is no class with the class code {`"${classCode}"`}
      </Text>
      <View style={styles.btnContainer}>
        <Button title="Back" onPress={goBack} />
      </View>
    </View>
  );
};

const JoinClassFinal: React.FC<JoinClassFinalPops> = ({
  className,
  section,
  teacher,
  onDone,
  disableJoin = false,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView svgImg={JoinClassImageComponent} />
      <Text style={styles.classNameText}>{className}</Text>
      <Text style={styles.sectionText}>{section}</Text>
      <Text style={styles.teacherNameText}>
        {teacher.length !== 0 && `By:${teacher}`}
      </Text>
      {disableJoin && (
        <Text style={styles.danger}>
          This class does not have active invite
        </Text>
      )}
      <View style={styles.btnContainer}>
        <Button disabled={disableJoin} title="Join" onPress={onDone} />
      </View>
    </View>
  );
};

export default JoinClassFinal;

import React from 'react';
import { Dimensions, StyleSheet, View, Button, Text } from 'react-native';
import EmptyStudentImageComponent from '../../../atoms/Images/EmptyStudentImageComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeImage: {
    height: Dimensions.get('window').height * 0.4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 20,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 20,
  },
  btnContainerStyle: {
    width: '50%',
    // marginVertical: 10,
    marginTop: 20,
  },
});

export interface StudentsEmptyListPops {
  onInviteClick: () => void;
}

const StudentsEmptyList: React.FC<StudentsEmptyListPops> = ({
  onInviteClick,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <EmptyStudentImageComponent style={styles.largeImage} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>Invite students</Text>
      </View>

      <View style={styles.btnContainerStyle}>
        <Button title="INVITE" onPress={onInviteClick} />
      </View>
    </View>
  );
};

export default StudentsEmptyList;

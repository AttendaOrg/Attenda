/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { lightColor } from '../../../util/Colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: lightColor,
  },
  className: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    color: '#6A6A6A',
    marginVertical: 6,
  },
  teacherName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  rollNo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
});

const imageSrc = require('../../../../assets/images/study.png');

export interface ClassDetailsPops {
  className: string;
  section: string;
  teacherName: string;
  rollNo: string;
}

const ClassDetails: React.FC<ClassDetailsPops> = ({
  className,
  section,
  teacherName,
  rollNo,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={imageSrc} style={styles.image} />
      <Text style={styles.className}>{className}</Text>
      <Text style={styles.section}>{section}</Text>
      <Text style={styles.teacherName}>By: {teacherName}</Text>
      <Text style={styles.rollNo}>Roll No: {rollNo}</Text>
    </View>
  );
};

export default ClassDetails;

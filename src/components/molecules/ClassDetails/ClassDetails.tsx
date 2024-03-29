/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { lightColor } from '../../../util/Colors';
import AttendanceRecordImageComponent from '../../atoms/Images/AttendanceRecordImageComponent';

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
    height: 300,
    width: 350,
    // borderRadius: 100,
  },
});

export interface ClassDetailsPops {
  className: string;
  section: string;
  teacherName?: string;
  rollNo?: string;
}

const ClassDetails: React.FC<ClassDetailsPops> = ({
  className,
  section,
  teacherName,
  rollNo,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <AttendanceRecordImageComponent />
      <Text style={styles.className}>{className}</Text>
      <Text style={styles.section}>{section}</Text>
      {teacherName !== undefined && (
        <Text style={styles.teacherName}>By: {teacherName}</Text>
      )}
      {rollNo !== undefined && (
        <Text style={styles.rollNo}>Your roll no: {rollNo}</Text>
      )}
    </View>
  );
};

export default ClassDetails;

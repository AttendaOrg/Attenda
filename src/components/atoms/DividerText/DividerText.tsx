import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  divider: {
    flex: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 2,
  },
  text: {
    marginHorizontal: 8,
  },
});

export interface DividerTextPops {
  text: string;
}

const DividerText: React.FC<DividerTextPops> = ({ text }): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.divider} />
    </View>
  );
};

export default DividerText;

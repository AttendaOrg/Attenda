import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CenterView: React.FC = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default CenterView;

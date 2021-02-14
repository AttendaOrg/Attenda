import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLogo from '../../../atoms/Icons/AppLogo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  aboveTextContainer: {
    alignItems: 'center', // horizontally centered
    marginBottom: 16,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 20,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Loading = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <AppLogo />
      </View>

      <View style={styles.aboveTextContainer}>
        <Text>From</Text>
        <Text style={styles.text}>Softlake</Text>
      </View>
    </View>
  );
};

export default Loading;

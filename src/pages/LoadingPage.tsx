import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {},
});

const LoadingPage = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Loading</Text>
    </View>
  );
};

export default LoadingPage;

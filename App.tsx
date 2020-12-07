import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>

      <StatusBar style="auto" />
    </View>
  );
};

export default App;

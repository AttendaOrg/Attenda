import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {},
});

interface HelloWorldProps {
  text?: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({
  text = 'Hello World',
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
};

export default HelloWorld;

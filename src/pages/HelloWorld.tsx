import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import HelloWorld from '../components/atoms/HelloWorld';
import { RootStackParamList } from '../App';

const styles = StyleSheet.create({
  container: {},
});

type Props = StackScreenProps<RootStackParamList, 'HelloWorld'>;

export const HelloWorldPageNavigationOptions: StackNavigationOptions = {
  headerTitle: 'Custom Title',
  headerTintColor: 'red',
};

const HelloWorldPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <View style={styles.container}>
      <HelloWorld text="Not Home Page!!" />
      <Button
        title="Click Me"
        onPress={() => {
          navigation.push('HelloWorld');
        }}
      />
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
    </View>
  );
};

export default HelloWorldPage;

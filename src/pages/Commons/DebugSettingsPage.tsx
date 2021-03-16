import {
  StackScreenProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../App';
import DebugSettings from '../../components/organisms/Common/DebugSettings/DebugSettings';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

const styles = StyleSheet.create({
  container: {},
});

type Props = StackScreenProps<RootStackParamList, 'DebugSettings'>;

export const DebugSettingsNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Debug Settings',
};

const DebugSettingsPage: React.FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <DebugSettings />
    </View>
  );
};

export default DebugSettingsPage;

import {
  StackScreenProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../App';
import EditDebugSettings from '../../components/organisms/Common/DebugSettings/EditDebugSettings';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';

const styles = StyleSheet.create({
  container: {},
});

type Props = StackScreenProps<RootStackParamList, 'EditDebugSettings'>;

export const EditDebugSettingsNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Edit Debug Settings',
};

const EditDebugSettingsPage: React.FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <EditDebugSettings />
    </View>
  );
};

export default EditDebugSettingsPage;

import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { lightColor, primaryColor } from '../../util/Colors';
import { RootStackParamList } from '../../App';

const SimpleHeaderNavigationOptions: StackNavigationOptions = {
  headerLeft: () => (
    <TouchableOpacity onPress={() => null}>
      <MaterialIcons name="menu" size={24} color={lightColor} />
    </TouchableOpacity>
  ),
  headerLeftContainerStyle: {
    margin: 16,
  },
  headerStyle: {
    backgroundColor: primaryColor,
  },
  headerTitleStyle: {
    color: lightColor,
  },
  title: 'Attenda',
};

export const SimpleHeaderBackNavigationOptions = <
  T extends keyof RootStackParamList
>({
  navigation,
}: StackScreenProps<RootStackParamList, T>): StackNavigationOptions => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.canGoBack() && navigation.goBack()}
    >
      <MaterialIcons name="arrow-back" size={24} color={lightColor} />
    </TouchableOpacity>
  ),
  headerLeftContainerStyle: {
    margin: 16,
  },
  headerStyle: {
    backgroundColor: primaryColor,
  },
  headerTitleStyle: {
    color: lightColor,
  },
  title: 'Attenda',
});

export default SimpleHeaderNavigationOptions;

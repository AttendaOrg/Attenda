import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { lightColor, primaryColor } from '../../util/Colors';
import { RootStackParamList } from '../../App';

type Props<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

const SimpleHeaderNavigationOptions = <T extends keyof RootStackParamList>({
  navigation,
}: Props<T>): StackNavigationOptions => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    >
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
});

export const SimpleHeaderBackNavigationOptions: StackNavigationOptions = {
  headerLeftContainerStyle: {
    // margin: 16,
    // marginRight: 0,
  },
  headerStyle: {
    backgroundColor: primaryColor,
  },
  title: 'Attenda',
  headerTintColor: lightColor,
};

export default SimpleHeaderNavigationOptions;

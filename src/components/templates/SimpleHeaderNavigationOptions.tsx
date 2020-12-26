import React from 'react';
import {
  HeaderTitle,
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { StatusBar, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import {
  lightColor,
  primaryColor,
  primaryStatusBarColor,
} from '../../util/Colors';
import { RootStackParamList } from '../../App';

type Props<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

const SimpleHeaderNavigationOptions = <T extends keyof RootStackParamList>({
  navigation,
}: Props<T>): StackNavigationOptions => ({
  headerLeft: () => (
    <>
      <StatusBar
        backgroundColor={primaryStatusBarColor}
        barStyle="light-content"
      />
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <MaterialIcons name="menu" size={24} color={lightColor} />
      </TouchableOpacity>
    </>
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
  headerTitle: ({ children, tintColor, style }) => (
    <>
      <StatusBar
        backgroundColor={primaryStatusBarColor}
        barStyle="light-content"
      />
      <HeaderTitle style={style} tintColor={tintColor}>
        {children}
      </HeaderTitle>
    </>
  ),
};

export default SimpleHeaderNavigationOptions;

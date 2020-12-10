import React from 'react';

import { StackNavigationOptions } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { lightColor, primaryColor } from '../../util/Colors';

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

export default SimpleHeaderNavigationOptions;

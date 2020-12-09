import React from 'react';

import { StackNavigationOptions } from '@react-navigation/stack';
import { StatusBar, TouchableOpacity, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

const SimpleCloseNavigationOptions: StackNavigationOptions = {
  headerTransparent: true,
  header: props => (
    <View style={{ marginTop: (StatusBar.currentHeight || 0) / 2 }}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <MaterialIcons name="close" size={24} style={{ margin: 16 }} />
      </TouchableOpacity>
    </View>
  ),
};

export default SimpleCloseNavigationOptions;

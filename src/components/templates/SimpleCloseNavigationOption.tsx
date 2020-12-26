import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { lightColor } from '../../util/Colors';

const SimpleCloseNavigationOptions: StackNavigationOptions = {
  headerTransparent: true,
  header: props => (
    // <View style={{ marginTop: (StatusBar.currentHeight || 0) / 2 }}>
    <View>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <MaterialIcons
          name="close"
          size={24}
          style={{ marginLeft: 16, marginTop: 5 }}
        />
      </TouchableOpacity>
    </View>
  ),
};

export const NoHeaderNavigationOptions: StackNavigationOptions = {
  headerTransparent: true,
  header: () => (
    <StatusBar barStyle="dark-content" backgroundColor={lightColor} />
  ),
};

export const withSimpleCloseNavigationOptions = (
  title: string,
): StackNavigationOptions => ({
  header: props => (
    <View
      style={{
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
      }}
    >
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <MaterialIcons name="close" size={24} style={{ margin: 16 }} />
      </TouchableOpacity>
      <Text>{title}</Text>
    </View>
  ),
});

export default SimpleCloseNavigationOptions;

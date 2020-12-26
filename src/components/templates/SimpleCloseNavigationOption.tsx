import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { lightColor } from '../../util/Colors';

const SimpleCloseNavigationOptions: StackNavigationOptions = {
  headerTransparent: true,
  title: '',
  headerLeft: ({ tintColor }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigation = useNavigation();

    return (
      // style={{ marginTop: (StatusBar.currentHeight || 0) / 2 }} FIXME: pick an appropriate value
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="close"
            size={24}
            color={tintColor}
            style={{ margin: 16 }}
          />
        </TouchableOpacity>
      </View>
    );
  },
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

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HelloWorldPage, {
  HelloWorldPageNavigationOptions,
} from './pages/HelloWorld';

export type RootStackParamList = {
  HelloWorld: undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HelloWorld"
          component={HelloWorldPage}
          options={HelloWorldPageNavigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

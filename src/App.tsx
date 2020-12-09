import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInPage, { SignInPageNavigationOptions } from './pages/SignInPage';

export type RootStackParamList = {
  SignIn: undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInPage}
          options={SignInPageNavigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const App = (): JSX.Element => <SignIn />;

export default App;

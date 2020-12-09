import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInPage, { SignInPageNavigationOptions } from './pages/SignInPage';
import ForgotPasswordPage, {
  ForgotPasswordNavigationOptions,
} from './pages/ForgotPasswordPage';

export type RootStackParamList = {
  SignIn: undefined;
  ForgotPassword: undefined;
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
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordPage}
          options={ForgotPasswordNavigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const App = (): JSX.Element => <ForgotPassword email="" />;

export default App;

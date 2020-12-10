import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInPage, { SignInPageNavigationOptions } from './pages/SignInPage';
import ForgotPasswordPage, {
  ForgotPasswordNavigationOptions,
} from './pages/ForgotPasswordPage';
import SignUpPagePage, {
  SignUpPageNavigationOptions,
} from './pages/SignUpPage';
import ChooseRolePage, {
  ChooseRoleNavigationOptions,
} from './pages/ChooseRolePage';

export type RootStackParamList = {
  SignIn: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
  ChooseRole: undefined;
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
        <Stack.Screen
          name="SignUp"
          component={SignUpPagePage}
          options={SignUpPageNavigationOptions}
        />
        <Stack.Screen
          name="ChooseRole"
          component={ChooseRolePage}
          options={ChooseRoleNavigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const App = (): JSX.Element => <ChooseRole />;

export default App;

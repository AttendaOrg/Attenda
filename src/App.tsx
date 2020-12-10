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
import ChooseRole from './components/organisms/ChooseRole/ChooseRole';
import SignUp from './components/organisms/SignUp';
import ForgotPassword from './components/organisms/ForgotPassword';
import EmptyClassList from './components/organisms/EmptyClassList/EmptyClassList';

export type RootStackParamList = {
  SignIn: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
  ChooseRole: undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();

// const App = (): JSX.Element => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="SignIn"
//           component={SignInPage}
//           options={SignInPageNavigationOptions}
//         />
//         <Stack.Screen
//           name="ForgotPassword"
//           component={ForgotPasswordPage}
//           options={ForgotPasswordNavigationOptions}
//         />
//         <Stack.Screen
//           name="SignUp"
//           component={SignUpPagePage}
//           options={SignUpPageNavigationOptions}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

const App = (): JSX.Element => <EmptyClassList />;
// onCancelClick={() => null}

export default App;

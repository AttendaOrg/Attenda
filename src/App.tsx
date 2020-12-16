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
import StudentClassListPage, {
  StudentClassListNavigationOptions,
} from './pages/Student/StudentClassListPage';
import JoinClassFormPage, {
  JoinClassFormNavigationOptions,
} from './pages/Student/JoinClassFormPage';
import JoinClassPage, {
  JoinClassNavigationOptions,
} from './pages/Student/JoinClassPage';
import TurnOnWifiPage, {
  TurnOnWifiNavigationOptions,
} from './pages/Student/TurnOnWifiPage';
import GiveResponsePage, {
  GiveResponseNavigationOptions,
} from './pages/Student/GiveResponsePage';
import SuccessResponsePage, {
  SuccessResponseNavigationOptions,
} from './pages/Student/SuccessResponsePage';
import UnsuccessfulResponsePage, {
  UnsuccessfulResponseNavigationOptions,
} from './pages/Student/UnsuccessfulResponsePage';
import AttendanceRecordPage, {
  AttendanceRecordNavigationOptions,
} from './pages/Student/AttendanceRecordPage';

export type RootStackParamList = {
  SignIn: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
  ChooseRole: undefined;
  StudentClassList: undefined;
  JoinClassForm: {
    classCode?: string;
  };
  JoinClass: {
    classCode: string;
    rollNo: string;
  };
  TurnOnWifi: undefined;
  GiveResponse: {
    classId: string;
  };
  SuccessResponse: undefined;
  UnsuccessfulResponse: undefined;
  StudentAttendanceRecord: {
    classId: string;
  };
};

export const Stack = createStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* App Intro */}
        <>
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
        </>
        {/* student */}
        <>
          <Stack.Screen
            name="StudentClassList"
            component={StudentClassListPage}
            options={StudentClassListNavigationOptions}
          />

          <Stack.Screen
            name="JoinClass"
            component={JoinClassPage}
            options={JoinClassNavigationOptions}
          />

          <Stack.Screen
            name="JoinClassForm"
            component={JoinClassFormPage}
            options={JoinClassFormNavigationOptions}
          />

          <Stack.Screen
            name="TurnOnWifi"
            component={TurnOnWifiPage}
            options={TurnOnWifiNavigationOptions}
          />

          <Stack.Screen
            name="GiveResponse"
            component={GiveResponsePage}
            options={GiveResponseNavigationOptions}
          />

          <Stack.Screen
            name="SuccessResponse"
            component={SuccessResponsePage}
            options={SuccessResponseNavigationOptions}
          />
          <Stack.Screen
            name="UnsuccessfulResponse"
            component={UnsuccessfulResponsePage}
            options={UnsuccessfulResponseNavigationOptions}
          />
          <Stack.Screen
            name="StudentAttendanceRecord"
            component={AttendanceRecordPage}
            options={AttendanceRecordNavigationOptions}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const App = (): JSX.Element => <StartAttendanceSession />;

export default App;

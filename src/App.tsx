import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
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
import JoinClassFinalPage, {
  JoinClassFinalNavigationOptions,
} from './pages/Student/JoinClassFinalPage';
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
import TeacherClassListPage, {
  TeacherClassListNavigationOptions,
} from './pages/Teacher/TeacherClassListPage';
import EditStudentAttendanceRecordPage, {
  EditStudentAttendanceRecordNavigationOptions,
} from './pages/Teacher/EditStudentAttendanceRecordPage';
import InviteStudentPage, {
  InviteStudentNavigationOptions,
} from './pages/Teacher/InviteStudentPage';
import StudentListPage, {
  StudentListNavigationOptions,
} from './pages/Teacher/StudentListPage';
import TeacherAttendanceRecordPage, {
  AttendanceRecordTabProps,
  TeacherAttendanceRecordNavigationOptions,
} from './pages/Teacher/AttendanceRecordPage';
import EditAttendanceSessionPage, {
  EditAttendanceSessionNavigationOptions,
} from './pages/Teacher/EditAttendanceSessionPage';
import ClassSettingsPage, {
  ClassSettingsNavigationOptions,
} from './pages/Teacher/ClassSettingsPage';
import StartAttendanceSessionPage, {
  StartAttendanceSessionNavigationOptions,
} from './pages/Teacher/StartAttendanceSessionPage';
import CurrentAttendanceSessionPage, {
  CurrentAttendanceSessionNavigationOptions,
} from './pages/Teacher/CurrentAttendanceSessionPage';

export type RootStackParamList = {
  SignIn: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
  ChooseRole: undefined;
  StudentClassList: undefined;
  JoinClassForm: {
    classCode?: string;
  };
  JoinClassFinal: {
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
  TeacherClassList: undefined;
  EditStudentAttendanceRecord: {
    classId: string;
    studentId: string;
  };
  InviteStudent: undefined;
  StudentList: {
    classId: string;
    totalSelected: number;
    showDeleteDialog: boolean;
  };
  TeacherAttendanceRecord: {
    classId: string;
    selectedTab: AttendanceRecordTabProps;
  };
  EditAttendanceSession: {
    sessionId: string;
    date: Date;
  };
  ClassSettings: {
    classId: string;
  };
  StartAttendanceSession: {
    classId: string;
  };
  CurrentAttendanceSession: {
    classId: string;
    showStopDialog: boolean;
  };
};

export const Stack = createStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  return (
    <MenuProvider>
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
              name="JoinClassFinal"
              component={JoinClassFinalPage}
              options={JoinClassFinalNavigationOptions}
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
          {/* Teacher */}
          <>
            <Stack.Screen
              name="TeacherClassList"
              component={TeacherClassListPage}
              options={TeacherClassListNavigationOptions}
            />
            <Stack.Screen
              name="EditStudentAttendanceRecord"
              component={EditStudentAttendanceRecordPage}
              options={EditStudentAttendanceRecordNavigationOptions}
            />
            <Stack.Screen
              name="InviteStudent"
              component={InviteStudentPage}
              options={InviteStudentNavigationOptions}
            />
            <Stack.Screen
              name="StudentList"
              component={StudentListPage}
              options={StudentListNavigationOptions}
            />
            <Stack.Screen
              name="TeacherAttendanceRecord"
              component={TeacherAttendanceRecordPage}
              options={TeacherAttendanceRecordNavigationOptions}
            />
            <Stack.Screen
              name="EditAttendanceSession"
              component={EditAttendanceSessionPage}
              options={EditAttendanceSessionNavigationOptions}
            />
            <Stack.Screen
              name="ClassSettings"
              component={ClassSettingsPage}
              options={ClassSettingsNavigationOptions}
            />
            <Stack.Screen
              name="StartAttendanceSession"
              component={StartAttendanceSessionPage}
              options={StartAttendanceSessionNavigationOptions}
            />
            <Stack.Screen
              name="CurrentAttendanceSession"
              component={CurrentAttendanceSessionPage}
              options={CurrentAttendanceSessionNavigationOptions}
            />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
};

// const App = (): JSX.Element => <NoAttendancePopup />;

export default App;

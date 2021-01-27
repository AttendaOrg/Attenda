import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import firebase from 'firebase';
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
import CreateClassPage, {
  CreateClassNavigationOptions,
} from './pages/Teacher/CreateClassPage';
import DrawerContentPage from './pages/Commons/DrawerContentPage';
import ChangePasswordPage, {
  ChangePasswordNavigationOptions,
} from './pages/Commons/ChangePassword';
import MyAccountPage, {
  MyAccountNavigationOptions,
} from './pages/Commons/MyAccountPage';
import { UserRole } from './api';
import LoadingPage, { LoadingPageNavigationOptions } from './pages/LoadingPage';
import AuthApi, { authApi } from './api/AuthApi';
import GlobalContext, { GlobalContextProvider } from './context/GlobalContext';
import SpinnerLoader from './components/molecules/SpinnerLoader';
import { convertErrorToMsg } from './api/BaseApi';

export type TeacherClassListNavigationProps = {
  withDismiss?: boolean;
};

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
  /**
   * using Popup instated
   * @deprecated route
   */
  TurnOnWifi: undefined;
  GiveResponse: {
    classId: string;
  };
  SuccessResponse: undefined;
  UnsuccessfulResponse: undefined;
  StudentAttendanceRecord: {
    classId: string;
  };
  TeacherClassList: TeacherClassListNavigationProps;
  EditStudentAttendanceRecord: {
    classId: string;
    studentId: string;
  };
  InviteStudent: undefined;
  StudentList: {
    classId: string;
  };
  TeacherAttendanceRecord: {
    classId: string;
    selectedTab: AttendanceRecordTabProps;
  };
  EditAttendanceSession: {
    sessionId: string;
    date: string;
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
    sessionTime: string;
  };
  CreateClass: undefined;
  // drawer
  MyAccount: undefined;
  ChangePassword: undefined;
  Loading: undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();

type Props = DrawerScreenProps<RootStackParamList, 'JoinClassFinal'>;

const AuthProvider: React.FC<Props> = ({ navigation }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [_role, setRole] = useState<UserRole | null>(null);
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    return firebase
      .auth()
      .onAuthStateChanged(async (user: firebase.User | null) => {
        setIsSignedIn(user !== null);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    (async () => {
      // TODO: handle back from chose role page
      // if the use is loaded before we don't need to reload the user
      if (_role !== null) return;

      // TODO: handle error case
      const [role, error] = await authApi.getUserRole();

      setRole(role);
      console.log(convertErrorToMsg(error));
      // if the auth is not auth loading is not finished
      // we don't need to navigate to any screen
      // show some loading page
      if (isLoading) return;

      //#region navigation
      // if user role is UNKNOWN and user is not signed in
      // reset the navigation stack to Sign In page

      if (!AuthApi.isRoleSelected(role) && !isSignedIn) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'SignIn' }],
          }),
        );

        return;
      }

      // if user role is selected and user is not signed in
      // reset the navigation stack to Sign In page
      if (AuthApi.isRoleSelected(role) && !isSignedIn) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'SignIn' }],
          }),
        );

        return;
      }

      // if user role is UNKNOWN and user is signed in
      // reset the navigation stack to Sign In page and go to ChooseRole page
      // BUG: if the user backs from the chose role page there is no way to go
      // to choose role page.
      // because upon login re-login does not trigger onAuthStateChanged callback.
      if (!AuthApi.isRoleSelected(role) && isSignedIn) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'SignIn' }, { name: 'ChooseRole' }],
          }),
        );

        return;
      }

      // if the role is selected and user signed in
      // go to roles respected page
      if (AuthApi.isRoleSelected(role) && isSignedIn) {
        // if the role is teacher go to TeacherClassList
        if (role === UserRole.TEACHER) {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'TeacherClassList' }],
            }),
          );

          return;
        }
        // if the role is teacher go to StudentClassList
        if (role === UserRole.STUDENT) {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'StudentClassList' }],
            }),
          );

          return;
        }
      }
      //#endregion
      // eslint-disable-next-line no-console
      console.log('something bad has happened no navigation was triggered');
    })();
  }, [_role, isLoading, isSignedIn, navigation]);

  const isRoleLoading: boolean = _role === null && isSignedIn;

  let showLoading: boolean = globalContext.settings.isSpinnerLoading;

  if (!showLoading) showLoading = isRoleLoading;

  return (
    <MenuProvider>
      <Stack.Navigator>
        {/* App Intro */}
        <>
          <Stack.Screen
            name="Loading"
            component={LoadingPage}
            options={LoadingPageNavigationOptions}
          />
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
          <Stack.Screen
            name="CreateClass"
            component={CreateClassPage}
            options={CreateClassNavigationOptions}
          />
        </>
        {/* student */}
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

        {/* this route is deprecated using popup instead */}
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
        <>
          {/* account */}
          <Stack.Screen
            name="MyAccount"
            component={MyAccountPage}
            options={MyAccountNavigationOptions}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordPage}
            options={ChangePasswordNavigationOptions}
          />
        </>
      </Stack.Navigator>
      <SpinnerLoader show={showLoading} />
    </MenuProvider>
  );
};

const Drawer = createDrawerNavigator();

const App = (): JSX.Element => (
  <GlobalContextProvider>
    <NavigationContainer>
      <Drawer.Navigator drawerStyle={{}} drawerContent={DrawerContentPage}>
        <Drawer.Screen name="App" component={AuthProvider} />
      </Drawer.Navigator>
    </NavigationContainer>
  </GlobalContextProvider>
);

export default App;

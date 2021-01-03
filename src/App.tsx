import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import AuthApi from './api/AuthApi';
import { UserType } from './api';

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
};

export const Stack = createStackNavigator<RootStackParamList>();

const AuthProvider = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user: firebase.User | null) => {
        setIsSignedIn(user !== null);
      });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const auth = new AuthApi();

    (async () => {
      const [type, error] = await auth.getUserType();

      if (!error) {
        setUserType(type);
      }
    })();
  }, [isSignedIn]);

  const commons = (
    <>
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
  );

  const student = (
    <MenuProvider>
      <Stack.Navigator>
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
        {commons}
      </Stack.Navigator>
    </MenuProvider>
  );

  const teacher = (
    <MenuProvider>
      <Stack.Navigator>
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
        {commons}
      </Stack.Navigator>
    </MenuProvider>
  );

  if (isSignedIn) {
    if (userType === UserType.STUDENT) {
      return student;
    }
    if (userType === UserType.TEACHER) {
      return teacher;
    }
  }

  return (
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
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const App = (): JSX.Element => (
  <NavigationContainer>
    <Drawer.Navigator drawerStyle={{}} drawerContent={DrawerContentPage}>
      <Drawer.Screen name="App" component={AuthProvider} />
    </Drawer.Navigator>
  </NavigationContainer>
);

(async () => {
  // const auth = new AuthApi();
  // const teacher = new TeacherApi();
  // const [success, error] = await auth.signUpWithEmailAndPassword(
  //   'prasantabarman06@gmail.com',
  //   '123456',
  // );
  // const [success2, error2] = await auth.loginWithEmailAndPassword(
  //   'prasantabarman06@gmail.com',
  //   '123456',
  // );
  // console.log(success, convertErrorToMsg(error));
  // console.log(success2, convertErrorToMsg(error2));
  // const [a] = await auth.getUseType();
  // console.log(a);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // window.auth = auth;
  // const [userId] = await teacher.createUser('Prasanta Barman');
  // if (userId) {
  //   const [classId] = await teacher.createClass(
  //     userId,
  //     new TeacherClass({
  //       title: 'Mathematics And Science',
  //       section: 'CE/PE',
  //     }),
  //   );
  //   if (classId) {
  //     const c = await teacher.isClassExist(userId, classId);
  //     console.log(c);
  //   }
  // }
  // console.table({ success, errors });
  // console.log(success);
})();

export default App;

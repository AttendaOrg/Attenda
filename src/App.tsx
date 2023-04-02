import React from 'react';
import { Alert } from 'react-native';
import * as Linking from 'expo-linking';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

import JoinClassFinalPage, {
  JoinClassFinalNavigationOptions,
} from './pages/Student/JoinClassFinalPage';
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
} from './pages/Commons/ChangePasswordPage';
import MyAccountPage, {
  MyAccountNavigationOptions,
} from './pages/Commons/MyAccountPage';
import { UserRole } from './api';
import LoadingPage, { LoadingPageNavigationOptions } from './pages/LoadingPage';
import AuthApi, { authApi } from './api/AuthApi';
import GlobalContext, { GlobalContextProvider } from './context/GlobalContext';
import SpinnerLoader from './components/molecules/SpinnerLoader';
import DebugSettingsPage, {
  DebugSettingsNavigationOptions,
} from './pages/Commons/DebugSettingsPage';
import EditDebugSettingsPage, {
  EditDebugSettingsNavigationOptions,
} from './pages/Commons/EditDebugSettingsPage';
import ChooseClassIconPage, {
  ChooseClassIconNavigationOptions,
} from './pages/Teacher/ChooseClassIconPage';
import { analyticsApi } from './api/analytics';
import NetworkChangeListener from './pages/Commons/NetworkChangeListener';
// eslint-disable-next-line no-restricted-imports
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // eslint-disable-line

export type TeacherClassListNavigationProps = {
  withDismiss?: boolean;
};

export type RootStackParamList = {
  SignIn: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
  ChooseRole: undefined;
  StudentClassList: undefined;
  JoinClassFinal: {
    preloadClassCode?: string;
  };
  /**
   * using Popup instated
   * @deprecated route
   */
  TurnOnWifi: undefined;
  GiveResponse: {
    classId: string;
    sessionId: string;
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
  InviteStudent: {
    classId: string;
  };
  StudentList: {
    classId: string;
    totalStudent: number;
  };
  TeacherAttendanceRecord: {
    classId: string;
    selectedTab: AttendanceRecordTabProps;
    totalStudentCount: number;
  };
  EditAttendanceSession: {
    sessionId: string;
    date: string;
    classId: string;
    totalStudentCount: number;
  };
  ClassSettings: {
    classId: string;
  };
  StartAttendanceSession: {
    classId: string;
    title: string;
    section: string;
  };
  CurrentAttendanceSession: {
    classId: string;
    sessionId: string;
    showStopDialog: boolean;
    sessionTime: string;
  };
  CreateClass: undefined;
  ChooseClassIcon: {
    classId: string;
  };
  // drawer
  MyAccount: undefined;
  ChangePassword: {
    code?: string;
  };
  Loading: undefined;
  // developer settings
  EditDebugSettings: undefined;
  DebugSettings: undefined;
};

enum WhitelistUrls {
  REST_PASSWORD = 'resetPassword',
  JOIN_CLASS = 'join',
}

const WHITELIST_URLS = [WhitelistUrls.REST_PASSWORD, WhitelistUrls.JOIN_CLASS];

function isValidHttpUrl(string?: string | null): boolean {
  if (string === null || string === undefined) return false;
  let scheme;

  try {
    const { scheme: _s } = Linking.parse(string ?? '');

    scheme = _s;
  } catch (_) {
    return false;
  }

  return scheme === 'http' || scheme === 'https' || scheme === 'exp';
}

const shouldHandleDeepLink = (url: string): boolean => {
  if (!isValidHttpUrl(url)) return false;

  const { path = '' } = Linking.parse(url);

  if (url.length <= 0) return false;

  const match = WHITELIST_URLS.map(whiteUrl =>
    (path ?? '').includes(whiteUrl),
  ).filter(e => e === true);

  return match.length > 0;
};

const extractJoinCode = (path: string): string => {
  const paths = path.split('/');
  const index = paths.indexOf(WhitelistUrls.JOIN_CLASS);

  if (index >= 0) {
    return paths[index + 1] ?? '';
  }

  return '';
};

export const Stack = createStackNavigator<RootStackParamList>();

type Props = DrawerScreenProps<RootStackParamList, 'JoinClassFinal'>;

class AuthProvider extends React.PureComponent<Props> {
  // eslint-disable-next-line react/static-property-placement
  context!: React.ContextType<typeof GlobalContext>;

  unsubscribe: firebase.Unsubscribe | null = null;

  async componentDidMount() {
    const {
      props: { navigation },
    } = this;

    const initialUrl = await Linking.getInitialURL();
    // 'https://www.attenda.org/resetPassword?oobCode=laS5gYZgZq51uheFw4Un7g5WSDnNm9Bdi-wv4Xovp2kE666_fBu2H8';

    // TODO: remove this in production
    // wake up the heroku instance
    const success = await analyticsApi.sendPing();

    // if (!success) Alert.alert("Couldn't start the heroku instance");

    this.unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (user: firebase.User | null) => {
        const isSignedIn = user !== null;
        const { context } = this;

        console.log('onAuthStateChanged', user);

        context.changeSpinnerLoading(true);

        const [role] = await authApi.getUserRole();

        if (shouldHandleDeepLink(initialUrl ?? '')) {
          if (this.handleRedirect(initialUrl ?? '', role)) {
            context.changeSpinnerLoading(false);

            return;
          }
        }

        context.changeSpinnerLoading(false);

        //#region navigation
        // TODO: handle back from chose role page
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
      });

    Linking.addEventListener('url', this.linkingCb);
  }

  componentWillUnmount() {
    if (this.unsubscribe !== null) this.unsubscribe();
    Linking.removeEventListener('url', this.linkingCb);
  }

  /**
   *
   * @param url
   * @param role
   * @returns boolean if we navigate in this function the function returns true else it's return false
   */
  handleRedirect = (url: string, role?: UserRole | null): boolean => {
    const { navigation } = this.props;

    console.log('Url->', url, role);

    // get the current route name
    const navState = navigation.dangerouslyGetState();
    const currentRoutes = navState.routes[0]?.state?.routes ?? [];
    const index = currentRoutes.length - 1;
    const currentRouteName = (currentRoutes ?? [])[index]?.name;

    const shouldHandleRedirect = shouldHandleDeepLink(url ?? '');

    // below is some case where it is not necessary to navigate
    // if we are already in the destination we don't need to navigate again
    if (
      currentRouteName === 'ChangePassword' ||
      currentRouteName === 'JoinClassForm'
    )
      return false;
    if (!isValidHttpUrl(url)) return false;
    if (!shouldHandleRedirect) return false;

    const { path = '', queryParams } = Linking.parse(url);
    const code = queryParams?.oobCode as string;
    const joinCode = extractJoinCode(path ?? '');

    const isValidCode = typeof code === 'string' && code.length > 0;
    const shouldRedirectToResetPassword = (path ?? '').includes(
      WhitelistUrls.REST_PASSWORD,
    );
    const isValidJoin = joinCode.length > 0;

    if (shouldRedirectToResetPassword && isValidCode) {
      if (typeof role === 'undefined' || role === null) {
        // console.log('valid dispatch SignIn -> ChangePassword');

        if (currentRoutes.length === 0)
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'SignIn',
                },
                { name: 'ChangePassword', params: { code } },
              ],
            }),
          );
        else navigation.navigate('ChangePassword', { code });
      } else {
        // console.log('valid dispatch ClassList -> ChangePassword');
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name:
                  role === UserRole.TEACHER
                    ? 'TeacherClassList'
                    : 'StudentClassList',
              },
              { name: 'ChangePassword', params: { code } },
            ],
          }),
        );
      }

      return true;
    }

    if (isValidJoin) AsyncStorage.setItem('@joinCode', joinCode);

    return false;
  };

  linkingCb = (evt: Linking.EventType, role?: UserRole) => {
    const { url } = evt;

    return this.handleRedirect(url, role);
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const {
      settings: { isSpinnerLoading: showLoading },
    } = this.context;

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
            <Stack.Screen
              name="ChooseClassIcon"
              component={ChooseClassIconPage}
              options={ChooseClassIconNavigationOptions}
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

            {/* this route is deprecated using popup instead */}

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
          {/* account */}
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
          {/* developer setting */}
          <>
            <Stack.Screen
              name="DebugSettings"
              component={DebugSettingsPage}
              options={DebugSettingsNavigationOptions}
            />
            <Stack.Screen
              name="EditDebugSettings"
              component={EditDebugSettingsPage}
              options={EditDebugSettingsNavigationOptions}
            />
          </>
        </Stack.Navigator>
        <SpinnerLoader show={showLoading} />
        <NetworkChangeListener />
      </MenuProvider>
    );
  }
}

AuthProvider.contextType = GlobalContext;

const Drawer = createDrawerNavigator();

// Linking.createURL is available as of expo@40.0.1 and expo-linking@2.0.1. If
// you are using older versions, you can upgrade or use Linking.makeUrl instead,
// but note that your deep links in standalone apps will be in the format
// scheme:/// rather than scheme:// if you use makeUrl.
// const prefix = Linking.createURL('/');
// const linking = {
//   prefixes: [prefix],
// };

const App = (): JSX.Element => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <GlobalContextProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerStyle={{}}
          // eslint-disable-next-line react/jsx-props-no-spreading
          drawerContent={props => <DrawerContentPage {...props} />}
        >
          <Drawer.Screen name="App" component={AuthProvider} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  </GestureHandlerRootView>
);

export default App;

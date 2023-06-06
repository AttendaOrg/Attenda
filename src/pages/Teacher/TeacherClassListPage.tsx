import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { AppState, AppStateStatus, Clipboard, Share } from 'react-native';
import { RootStackParamList } from '../../App';
import SimpleHeaderNavigationOptions from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';
import TeacherClassModel from '../../api/TeacherApi/model/TeacherClassModel';
import TeacherClassList, {
  dummyTeacherClassListData,
} from '../../components/organisms/Teacher/TeacherClassList';
import { authApi } from '../../api/AuthApi';
import GlobalContext from '../../context/GlobalContext';
import { TeacherClassAction } from '../../components/molecules/ClassCard/TeacherClassCard';

type Props = StackScreenProps<RootStackParamList, 'TeacherClassList'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

export const TeacherClassListNavigationOptions: OptionsProps = SimpleHeaderNavigationOptions;

// const transformToStudentListDataProps = (
//   cls: TeacherClassModel,
// ): StudentListDataProps => {
//   const {
//     title,
//     section,
//     classId,
//     isLive,
//     classCode,
//     currentSessionId,
//     totalStudent,
//   } = cls;

//   return {
//     attendance: `${totalStudent} student`, // TODO: get attendance summery from the class info
//     section,
//     showShimmer: false,
//     backgroundImage: classBack,
//     className: title,
//     key: classId ?? '',
//     teacherName: `Class Code: ${classCode}`,
//     isSessionLive: isLive,
//     currentSessionId,
//   };
// };

interface State {
  data: TeacherClassModel[];
  loading: boolean;
  isAccountVerified: boolean;
}

class TeacherClassListPage extends React.PureComponent<Props, State> {
  // eslint-disable-next-line react/static-property-placement
  context!: React.ContextType<typeof GlobalContext>;

  constructor(props: Props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      isAccountVerified: true,
    };
  }

  componentDidMount(): void {
    const { context } = this;

    this.setState({ loading: true });

    this.checkAccountVerification();
    AppState.addEventListener('change', this.handleAppStateChange);

    this.unSub = teacherApi.getClassListener(newData => {
      this.setState({ data: newData, loading: false });
    });

    try {
      const uri = authApi.getMyProfilePic();

      context.changeProfilePic({ uri });
    } catch (e) {
      console.log('Image access error', e);
    }
  }

  componentWillUnmount(): void {
    AppState?.removeEventListener('change', this.handleAppStateChange);
    this.unSub();
  }

  checkAccountVerification = async (): Promise<void> => {
    const isAccountVerified = await authApi.isAccountVerified();

    this.setState({ isAccountVerified });
  };

  handleAppStateChange = async (
    nextAppState: AppStateStatus,
  ): Promise<void> => {
    console.log(`nextAppState:->${nextAppState}`);

    if (nextAppState === 'active') {
      this.checkAccountVerification();
    }
  };

  unSub = (): void => {
    console.log('not implemented');
  };

  onLinkShare = async (url: string): Promise<void> => {
    try {
      // TODO: generate valid link
      await Share.share({
        message: url,
        url,
        title: 'Invite Code Link',
      });
    } catch (error) {
      //   console.log(error);
      Clipboard.setString(url);
    }
  };

  onAction = async (
    action: TeacherClassAction,
    info: TeacherClassModel,
  ): Promise<void> => {
    const { navigation } = this.props;
    const { context } = this;
    const { classId, totalStudent, inviteLink } = info;

    if (await context.throwNetworkError()) return;
    if (classId === null) return;

    switch (action) {
      case TeacherClassAction.ATTENDANCE_RECORD:
        navigation.push('TeacherAttendanceRecord', {
          classId,
          selectedTab: 'Sessions',
          totalStudentCount: totalStudent,
        });
        break;
      case TeacherClassAction.STUDENTS:
        navigation.push('StudentList', {
          classId,
          totalStudent,
        });
        break;
      case TeacherClassAction.SETTINGS:
        navigation.push('ClassSettings', { classId });
        break;
      case TeacherClassAction.SHARE_INVITE_LINK:
        this.onLinkShare(inviteLink);
        break;
      default:
        break;
    }
  };

  onClassClick = async (classInfo: TeacherClassModel): Promise<void> => {
    const { context } = this;
    const { navigation } = this.props;
    const { isLive, currentSessionId, classId, title, section } = classInfo;

    if (await context.throwNetworkError()) return;
    if (classId !== null) {
      if (isLive && currentSessionId !== null)
        navigation.push('CurrentAttendanceSession', {
          classId,
          sessionId: currentSessionId,
          sessionTime: new Date().toISOString(),
          showStopDialog: false,
        });
      else
        navigation.push('StartAttendanceSession', {
          classId,
          title,
          section,
        });
    }
  };

  render(): JSX.Element {
    const {
      onAction,
      onClassClick,
      props: { navigation },
      state: { data, loading, isAccountVerified },
    } = this;
    const withLoadingData: TeacherClassModel[] = loading
      ? dummyTeacherClassListData
      : data;

    return (
      <TeacherClassList
        onResendEmail={() => authApi.sendEmailVerificationCode()}
        isEmailVerified={isAccountVerified}
        data={withLoadingData}
        onAction={onAction}
        showShimmer={loading}
        onClassClick={onClassClick}
        onFabClick={() => navigation.push('CreateClass')}
      />
    );
  }
}

TeacherClassListPage.contextType = GlobalContext;

export default TeacherClassListPage;

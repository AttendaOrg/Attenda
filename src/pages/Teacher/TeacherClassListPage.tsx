import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { StudentListDataProps } from '../../components/organisms/Student/StudentClassList';
import SimpleHeaderNavigationOptions from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';
import TeacherClassModel from '../../api/TeacherApi/model/TeacherClassModel';
import TeacherClassList, {
  dummyTeacherClassListData,
} from '../../components/organisms/Teacher/TeacherClassList';
import AuthApi from '../../api/AuthApi';
import GlobalContext from '../../context/GlobalContext';

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const classBack = require('../../../assets/images/class-back-5.jpg');

type Props = StackScreenProps<RootStackParamList, 'TeacherClassList'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

export const TeacherClassListNavigationOptions: OptionsProps = SimpleHeaderNavigationOptions;

const transformToStudentListDataProps = (
  cls: TeacherClassModel,
): StudentListDataProps => {
  const {
    title,
    section,
    classId,
    isLive,
    classCode,
    currentSessionId,
    totalStudent,
  } = cls;

  return {
    attendance: `${totalStudent} student`, // TODO: get attendance summery from the class info
    section,
    showShimmer: false,
    backgroundImage: classBack,
    className: title,
    key: classId ?? '',
    teacherName: `Class Code: ${classCode}`,
    isSessionLive: isLive,
    currentSessionId,
  };
};

interface State {
  data: TeacherClassModel[];
  loading: boolean;
}

class TeacherClassListPage extends React.PureComponent<Props, State> {
  // eslint-disable-next-line react/static-property-placement
  context!: React.ContextType<typeof GlobalContext>;

  constructor(props: Props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
    };
  }

  async componentDidMount(): Promise<void> {
    const { context } = this;

    this.setState({ loading: true });

    this.unSub = teacherApi.getClassListener(newData => {
      this.setState({ data: newData, loading: false });
    });

    const uri = await AuthApi.getProfilePicRef().getDownloadURL();

    context.changeProfilePic({ uri });
  }

  componentWillUnmount(): void {
    this.unSub();
  }

  unSub = (): void => {
    console.log('not implemented');
  };

  render(): JSX.Element {
    const { data, loading } = this.state;
    const { navigation } = this.props;
    const newData: StudentListDataProps[] = loading
      ? dummyTeacherClassListData
      : data.map(transformToStudentListDataProps);

    return (
      <TeacherClassList
        showShimmer={loading}
        onFabClick={() => navigation.push('CreateClass')}
        data={newData}
        onClassClick={(classId, title, section, isLive, sessionId) => {
          if (isLive && sessionId !== null)
            navigation.push('CurrentAttendanceSession', {
              classId,
              sessionId,
              sessionTime: new Date().toISOString(),
              showStopDialog: false,
            });
          else
            navigation.push('StartAttendanceSession', {
              classId,
              title,
              section,
            });
        }}
        options={[
          {
            title: 'Attendance Record',
            onPress: (classId: string) =>
              navigation.push('TeacherAttendanceRecord', {
                classId,
                selectedTab: 'Sessions',
              }),
          },
          {
            title: 'Students',
            onPress: (classId: string) => {
              const match = data.filter(e => e.classId === classId);

              const totalStudent = match[0]?.totalStudent ?? 0;

              navigation.push('StudentList', {
                classId,
                totalStudent,
              });
            },
          },
          {
            title: 'Settings',
            onPress: (classId: string) =>
              navigation.push('ClassSettings', { classId }),
          },
          { title: 'Share invitation link', onPress: () => null },
        ]}
      />
    );
  }
}

TeacherClassListPage.contextType = GlobalContext;

export default TeacherClassListPage;

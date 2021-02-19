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

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const classBack = require('../../../assets/images/class-back-5.jpg');

type Props = StackScreenProps<RootStackParamList, 'TeacherClassList'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

export const TeacherClassListNavigationOptions: OptionsProps = SimpleHeaderNavigationOptions;

const transformToStudentListDataProps = (
  cls: TeacherClassModel,
): StudentListDataProps => {
  const { title, section, classId, isLive, classCode, currentSessionId } = cls;

  return {
    attendance: '70', // TODO: get attendance summery from the class info
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
  constructor(props: Props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ loading: true });

    this.unSub = teacherApi.getClassListener(newData => {
      this.setState({ data: newData, loading: false });
    });
    // setTimeout(() => {
    //   // FIXME: delete it
    //   const { navigation } = this.props;

    //   navigation.push('CurrentAttendanceSession', {
    //     classId: '63FrBTL7X0L9Xs2R6wJ3',
    //     sessionId: 'EEvk7wR3bYyOOZBNkYVo',
    //     showStopDialog: false,
    //     sessionTime: new Date().toISOString(),
    //   });
    // }, 1500);
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
        onClassClick={classId => {
          navigation.push('StartAttendanceSession', {
            classId,
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
            onPress: (classId: string) =>
              navigation.push('StudentList', {
                classId,
              }),
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

export default TeacherClassListPage;

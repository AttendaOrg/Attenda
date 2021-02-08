import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import StudentClassList, {
  StudentListDataProps,
} from '../../components/organisms/Student/StudentClassList';
import SimpleHeaderNavigationOptions from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';
import TeacherClassModel from '../../api/TeacherApi/model/TeacherClassModel';
import { dummyTeacherClassListData } from '../../components/organisms/Teacher/TeacherClassList';

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const classBack = require('../../../assets/images/class-back-5.jpg');

type Props = StackScreenProps<RootStackParamList, 'TeacherClassList'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

export const TeacherClassListNavigationOptions: OptionsProps = SimpleHeaderNavigationOptions;

const transformToStudentListDataProps = (
  cls: TeacherClassModel,
): StudentListDataProps => {
  const { title, section, classId, isLive, classCode } = cls;

  return {
    attendance: '70', // TODO: get attendance summery from the class info
    section,
    showShimmer: false,
    backgroundImage: classBack,
    className: title,
    key: classId ?? '',
    teacherName: `Class Code: ${classCode}`,
    isSessionLive: isLive,
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
      <StudentClassList
        showShimmer={loading}
        onFabClick={() => navigation.push('CreateClass')}
        data={newData}
        onClassClick={() => {
          navigation.push('StartAttendanceSession', {
            classId: '',
          });
        }}
        onMoreIconClick={() => null}
        options={[
          {
            title: 'Attendance Record',
            onPress: () =>
              navigation.push('TeacherAttendanceRecord', {
                classId: '',
                selectedTab: 'Sessions',
              }),
          },
          {
            title: 'Students',
            onPress: () =>
              navigation.push('StudentList', {
                classId: '',
              }),
          },
          {
            title: 'Settings',
            onPress: () => navigation.push('ClassSettings', { classId: '' }),
          },
          { title: 'Share invitation link', onPress: () => null },
        ]}
      />
    );
  }
}

export default TeacherClassListPage;

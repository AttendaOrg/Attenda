import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  HeaderTitle,
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { RnAndroidHotspot } from 'rn-android-hotspot';
import { Button, IconButton } from 'react-native-paper';
import { RootStackParamList, TeacherClassListNavigationProps } from '../../App';
import CurrentAttendanceSession, {
  CurrentAttendanceSessionDataProps,
} from '../../components/organisms/Teacher/CurrentAttendanceSession';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { lightColor } from '../../util/Colors';
import { convertDateTime } from '../../util';
import { NavigationEventListenerCallback } from '../../util/hooks/useConfirmBack';
import { teacherApi } from '../../api/TeacherApi';
import ClassStudentModel from '../../api/TeacherApi/model/ClassStudentModel';
import SessionStudentModel from '../../api/TeacherApi/model/SessionStudentModel';
import DoubleButtonPopup from '../../components/molecules/DoubleButtonPopup';
import GlobalContext from '../../context/GlobalContext';

type Props = StackScreenProps<RootStackParamList, 'CurrentAttendanceSession'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

export const CurrentAttendanceSessionNavigationOptions: OptionsProps = () => ({
  ...SimpleHeaderBackNavigationOptions,
  title: 'Current Session',
});

const transformToDataProps = (
  studentModel: ClassStudentModel,
  present = false,
): CurrentAttendanceSessionDataProps => {
  const { rollNo, studentId, studentName, profilePicUrl } = studentModel;

  return {
    key: studentId ?? '',
    name: studentName ?? '',
    present,
    rollNo,
    avatar: profilePicUrl ?? '',
  };
};

const findSessionByStudentId = (
  sessions: SessionStudentModel[],
  studentId: string,
): SessionStudentModel | null => {
  const found = sessions.filter(session => session.studentId === studentId);

  if (found.length === 0) return null;

  return found[0];
};

const mergeStudentListWithAttendanceInfo = (
  students: ClassStudentModel[],
  sessions: SessionStudentModel[] = [],
): CurrentAttendanceSessionDataProps[] => {
  // loop through all student registered in a class

  return students.map<CurrentAttendanceSessionDataProps>(student => {
    const found: SessionStudentModel | null = findSessionByStudentId(
      sessions,
      student.studentId ?? '',
    );

    if (found === null) return transformToDataProps(student);

    return transformToDataProps(student, found.present);
  });
};

const CurrentAttendanceSessionPage: React.FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const globalContext = useContext(GlobalContext);
  const [listItems, setListItems] = useState<
    CurrentAttendanceSessionDataProps[]
  >([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const onPresentChange = async (rollNo: string, present: boolean) => {
    const {
      params: { classId, sessionId },
    } = route;

    if (await globalContext.throwNetworkError()) return;
    // TODO: handle error
    await teacherApi.editStudentAttendanceReport(
      classId,
      sessionId,
      rollNo,
      present,
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Current Session',
      headerStyle: {
        backgroundColor: lightColor,
        // borderBottomColor: '#ddd',
        // borderBottomWidth: 1,
      },
      headerTitleStyle: { color: '#000' },
      headerLeft: () => (
        <IconButton
          icon="close"
          onPress={() => navigation.canGoBack() && navigation.goBack()}
          color="#000"
        />
      ),
      headerTitle: ({ children, style }) => (
        <>
          <HeaderTitle style={style}>{children}</HeaderTitle>
          <Text>{convertDateTime(new Date(route.params.sessionTime))}</Text>
        </>
      ),
      headerRight: () => (
        <View style={{ paddingRight: 16 }}>
          <Button
            mode="contained"
            color="#2196f3"
            onPress={() => {
              setShowSaveDialog(true);
              navigation.setParams({ showStopDialog: false });
            }}
          >
            STOP
          </Button>
        </View>
      ),
    });
  });

  useEffect(() => {
    const callback = async (e: NavigationEventListenerCallback) => {
      e.preventDefault();
      const {
        data: { action },
      } = e;

      // TODO: stop using the navigation props for opening the popup
      // if the payload contains withDismiss === true that means
      // it was fired by popup positive btn click
      // so go back from the screen
      if (
        (action.payload as {
          params: TeacherClassListNavigationProps;
        })?.params?.withDismiss ??
        false
      ) {
        navigation.dispatch(action);
      } else {
        navigation.setParams({ showStopDialog: true });
        setShowSaveDialog(false);
      }
    };

    // BUG: for some reason react-navigation is not showing the correct return type
    // expected () => removeListener(type, callback); but got () => void
    // so we are using remove listener method to clean up the event listener
    navigation.addListener('beforeRemove', callback);

    // it is necessary to remove the event free up the listener
    // or every data change useEffect will reattach the event listener with the old event
    return () => navigation.removeListener('beforeRemove', callback);
  }, [navigation, route]);

  useEffect(() => {
    (async () => {
      const {
        params: { sessionId, classId },
      } = route;
      const [listOfAllJoinedStudents] = await teacherApi.getAllStudentList(
        classId,
      );
      const newStudents = mergeStudentListWithAttendanceInfo(
        listOfAllJoinedStudents ?? [],
      );

      if (listOfAllJoinedStudents !== null) {
        setListItems(newStudents);

        const unSubscribe = teacherApi.getLiveStudentAttendance(
          classId,
          sessionId,
          listOfAllJoinedStudents,
          sessionsStudents => {
            const Students = mergeStudentListWithAttendanceInfo(
              listOfAllJoinedStudents ?? [],
              sessionsStudents,
            );

            setListItems(Students);
          },
        );

        return unSubscribe;
      }

      return () => console.log('not implemented');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveDialogDismiss = () => {
    setShowSaveDialog(false);
  };

  const stopHotSpot = async () => {
    await RnAndroidHotspot.stopHotspot();
  };

  const onSaveSession = async () => {
    const {
      params: { classId, sessionId },
    } = route;

    if (await globalContext.throwNetworkError()) return;
    await teacherApi.saveClassSession(classId, sessionId);
    await stopHotSpot();
    navigation.navigate('TeacherClassList', { withDismiss: true });
  };

  const onDismissClass = async () => {
    const {
      params: { classId, sessionId },
    } = route;

    if (await globalContext.throwNetworkError()) return;
    await teacherApi.discardClassSession(classId, sessionId);
    await stopHotSpot();

    navigation.navigate('TeacherClassList', { withDismiss: true });
  };

  return (
    <>
      <CurrentAttendanceSession
        studentList={listItems}
        onPresentChange={onPresentChange}
        showPopup={route.params.showStopDialog}
        onDismissPopup={() => navigation.setParams({ showStopDialog: false })}
        onPositivePopupClick={onDismissClass}
      />
      <DoubleButtonPopup
        negativeButtonText="Cancel"
        onNegativeButtonClick={saveDialogDismiss}
        positiveButtonText="Save"
        onPositiveButtonClick={onSaveSession}
        onDismiss={saveDialogDismiss}
        text="Save the Session ?"
        title="Save"
        visible={showSaveDialog}
      />
    </>
  );
};

export default CurrentAttendanceSessionPage;

import React, { useContext } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RnAndroidHotspot } from 'rn-android-hotspot';
import { RootStackParamList } from '../../App';
import StartAttendanceSession from '../../components/organisms/Teacher/StartAttendanceSession';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { teacherApi } from '../../api/TeacherApi';
import { requestLocationPermission } from '../../util/permissions';
import GlobalContext from '../../context/GlobalContext';

type Props = StackScreenProps<RootStackParamList, 'StartAttendanceSession'>;

export const StartAttendanceSessionNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Start Attendance',
};

const StartAttendanceSessionPage: React.FC<Props> = ({
  navigation,
  route: {
    params: { classId, title, section },
  },
}): JSX.Element => {
  const globalContext = useContext(GlobalContext);
  const startSession = async (date: Date) => {
    const { success: macId } = await RnAndroidHotspot.getHotspotMacId();

    if (macId !== undefined) {
      const [sessionId] = await teacherApi.startClassSession(
        classId,
        macId,
        date,
      );

      navigation.push('CurrentAttendanceSession', {
        classId,
        sessionId: sessionId ?? '',
        showStopDialog: false,
        sessionTime: date.toISOString(),
      });
    }
  };

  const onStartSession = async (date: Date) => {
    if (await globalContext.throwNetworkError()) return;
    const {
      success: isHotspotRunning,
    } = await RnAndroidHotspot.isHotspotRunning();

    if (isHotspotRunning === true) {
      await startSession(date);
    } else {
      await requestLocationPermission();
      await RnAndroidHotspot.askWifiStatePermission();
      await RnAndroidHotspot.displayLocationSettingsRequest();
      const { success: s, errorCode } = await RnAndroidHotspot.startHotspot();

      console.log(s, errorCode);
      const { success } = await RnAndroidHotspot.isHotspotRunning();

      if (success === true) await startSession(date);
      // TODO: else show user to tun on hotspot
    }
  };

  return (
    <StartAttendanceSession
      title={title}
      section={section}
      onStartSession={onStartSession}
    />
  );
};

export default StartAttendanceSessionPage;

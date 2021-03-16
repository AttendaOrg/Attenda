import React, { useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { Button, Dialog } from 'react-native-paper';
import {
  RnAndroidHotspot,
  useWifiHotSpotListScannerListener,
  useWifiStateChangeLister,
} from 'rn-android-hotspot';
import { RootStackParamList } from '../../App';
import GiveResponse, {
  GiveResponseLoadingState,
} from '../../components/organisms/Student/GiveResponse';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';
import { HEADER_AB_TEST_NEW } from '../../util/constant';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import TurnOnWifi from '../../components/organisms/Student/TurnOnWifi';
import { studentApi } from '../../api/StudentApi';
import { requestLocationPermission } from '../../util';

type Props = StackScreenProps<RootStackParamList, 'GiveResponse'>;

export const GiveResponseNavigationOptions: StackNavigationOptions = HEADER_AB_TEST_NEW
  ? { ...SimpleHeaderBackNavigationOptions, title: 'Give Present' }
  : SimpleCloseNavigationOptions;

const GiveResponsePage: React.FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const [showTurnOnWifiPopUp, setShowTurnOnWifiPopUp] = useState(false);
  const {
    params: { classId, sessionId },
  } = route;
  const [isWifiOn, stopListening] = useWifiStateChangeLister();
  const [giveResponseLoadingState, setGiveResponseLoadingState] = useState(
    GiveResponseLoadingState.DEFAULT,
  );

  const [
    wifiHotSpotListItems,
    _error,
    rescan,
    stopHotSpotListener,
  ] = useWifiHotSpotListScannerListener();

  const turnOnWifi = async () => {
    await RnAndroidHotspot.startWifi();
  };

  useEffect(() => {
    setShowTurnOnWifiPopUp(!isWifiOn);

    setGiveResponseLoadingState(
      isWifiOn
        ? GiveResponseLoadingState.SEARCHING_TEACHER
        : GiveResponseLoadingState.DEFAULT,
    );

    return stopListening;
  }, [isWifiOn, stopListening]);

  useEffect(() => {
    const hasMatch = async () => {
      Promise.all(
        wifiHotSpotListItems.map(async wifi => {
          const [success, error] = await studentApi.giveResponse(
            classId,
            sessionId,
            wifi.macId,
          ); // TODO: get the mac id from native api

          console.log(success, studentApi.convertErrorToMsg(error));

          if (success === true) navigation.replace('SuccessResponse');
          // else navigation.replace('UnsuccessfulResponse');
        }),
      );
    };

    hasMatch();

    return stopHotSpotListener;
  }, [
    classId,
    navigation,
    stopHotSpotListener,
    wifiHotSpotListItems,
    sessionId,
  ]);

  useEffect(() => {
    (async () => {
      await requestLocationPermission();
      await RnAndroidHotspot.displayLocationSettingsRequest();
    })();
  }, []);

  return (
    <>
      <GiveResponse loadingState={giveResponseLoadingState} />
      <Dialog visible={showTurnOnWifiPopUp} onDismiss={() => null}>
        <TurnOnWifi onCloseBtnClick={() => null} />
        <Button onPress={turnOnWifi}>Turn On Wifi</Button>
      </Dialog>
    </>
  );
};

export default GiveResponsePage;

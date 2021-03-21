import React, { useCallback, useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { Button } from 'react-native-paper';
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
import { studentApi } from '../../api/StudentApi';
import { requestLocationPermission } from '../../util/permissions';
import ImagePopup from '../../components/molecules/ImagePopup/ImagePopup';
import TurnOnWifiImageComponent from '../../components/atoms/Images/TurnOnWifiImageComponent';

type Props = StackScreenProps<RootStackParamList, 'GiveResponse'>;

const convertToGiveState = (_isWifiOn: boolean): GiveResponseLoadingState =>
  _isWifiOn
    ? GiveResponseLoadingState.SEARCHING_TEACHER
    : GiveResponseLoadingState.TURING_ON_WIFI;

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

  const [
    wifiHotSpotListItems,
    _error,
    rescan,
    stopHotSpotListener,
  ] = useWifiHotSpotListScannerListener();

  /**
   * try five time to turn on wifi automatically
   * @returns
   */
  const turnOnWifi = (): number => {
    let i = 0;

    const id = (setInterval(async () => {
      i += 1;
      await RnAndroidHotspot.startWifi();

      if (i >= 6) {
        clearInterval(id);
        setShowTurnOnWifiPopUp(true);
      }
    }, 500) as unknown) as number;

    return id;
  };

  useEffect(() => {
    if (!isWifiOn) turnOnWifi();
    if (isWifiOn) setShowTurnOnWifiPopUp(false);

    return () => {
      stopListening();
    };
  }, [isWifiOn, stopListening]);

  useEffect(() => {
    let id = 0;
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

      id = (setInterval(() => {
        rescan();
      }, 30 * 1000) as unknown) as number;
    };

    hasMatch();

    return () => {
      // console.log(`stopHotSpotListener();
      // clearInterval(id);`);
      stopHotSpotListener();
      clearInterval(id);
    };
  }, [
    classId,
    navigation,
    stopHotSpotListener,
    wifiHotSpotListItems,
    sessionId,
    rescan,
  ]);

  const getNecessaryPermissionForWifi = useCallback(async () => {
    await requestLocationPermission();
    await RnAndroidHotspot.displayLocationSettingsRequest();
    turnOnWifi();
  }, []);

  useEffect(() => {
    getNecessaryPermissionForWifi();
  }, [getNecessaryPermissionForWifi]);

  return (
    <>
      <GiveResponse loadingState={convertToGiveState(isWifiOn)} />
      <ImagePopup
        imageComponent={TurnOnWifiImageComponent}
        text=""
        title="Turn on your wifi"
        visible={showTurnOnWifiPopUp}
        onCancelClick={() => null}
        onDismiss={() => null}
      >
        <Button onPress={turnOnWifi}>Turn On Wifi</Button>
      </ImagePopup>
    </>
  );
};

export default GiveResponsePage;

import React, { useEffect, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { Dialog } from 'react-native-paper';
import { RootStackParamList } from '../../App';
import GiveResponse from '../../components/organisms/Student/GiveResponse';
import SimpleCloseNavigationOptions from '../../components/templates/SimpleCloseNavigationOption';
import { HEADER_AB_TEST_NEW } from '../../util/constant';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import TurnOnWifi from '../../components/organisms/Student/TurnOnWifi';
import { studentApi } from '../../api/StudentApi';

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

  useEffect(() => {
    setShowTurnOnWifiPopUp(true);
  }, []);

  const onPresentClick = async () => {
    const [success, error] = await studentApi.giveResponse(
      classId,
      sessionId,
      'macId',
    ); // TODO: get the mac id from native api

    console.log(success, studentApi.convertErrorToMsg(error));

    if (success === true) navigation.replace('SuccessResponse');
    else navigation.replace('UnsuccessfulResponse');
  };

  return (
    <>
      <GiveResponse onPresentClick={onPresentClick} />
      <Dialog
        visible={showTurnOnWifiPopUp}
        onDismiss={() => setShowTurnOnWifiPopUp(false)}
      >
        <TurnOnWifi onCloseBtnClick={() => setShowTurnOnWifiPopUp(false)} />
      </Dialog>
    </>
  );
};

export default GiveResponsePage;

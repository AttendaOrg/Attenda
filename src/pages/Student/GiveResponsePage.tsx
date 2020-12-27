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
import { useConfirmBack } from '../../util/hooks/useConfirmBack';

type Props = StackScreenProps<RootStackParamList, 'GiveResponse'>;

export const GiveResponseNavigationOptions: StackNavigationOptions = HEADER_AB_TEST_NEW
  ? { ...SimpleHeaderBackNavigationOptions, title: 'Give Present' }
  : SimpleCloseNavigationOptions;

const GiveResponsePage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [showTurnOnWifiPopUp, setShowTurnOnWifiPopUp] = useState(false);

  useEffect(() => {
    setShowTurnOnWifiPopUp(true);
  }, []);

  useConfirmBack(navigation);

  return (
    <>
      <GiveResponse
        onPresentClick={() => {
          if (Math.random() > 0.5) navigation.push('SuccessResponse');
          else navigation.push('UnsuccessfulResponse');
        }}
      />
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

import React, { useEffect, useState } from 'react';
import {
  HeaderTitle,
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { RootStackParamList, TeacherClassListNavigationProps } from '../../App';
import CurrentAttendanceSession, {
  CurrentAttendanceSessionDataProps,
} from '../../components/organisms/Teacher/CurrentAttendanceSession';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { lightColor } from '../../util/Colors';
import { convertDateTime } from '../../util';
import { NavigationEventListenerCallback } from '../../util/hooks/useConfirmBack';

type Props = StackScreenProps<RootStackParamList, 'CurrentAttendanceSession'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

export const CurrentAttendanceSessionNavigationOptions: OptionsProps = ({
  navigation,
  route,
}) => ({
  ...SimpleHeaderBackNavigationOptions,
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
        onPress={() =>
          navigation.setParams({
            showStopDialog: true,
          })
        }
      >
        STOP
      </Button>
    </View>
  ),
});

const CurrentAttendanceSessionPage: React.FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const [listItems, setListItems] = useState<
    CurrentAttendanceSessionDataProps[]
  >([
    {
      name: 'Prasanta Barman',
      rollNo: 'IIT2154',
      key: 'IIT2154',
      present: false,
    },
    {
      name: 'Apurba Roy',
      rollNo: 'IIT2441454',
      key: 'IIT2441454',
      present: true,
    },
  ]);

  const onPresentChange = async (rollNo: string, present: boolean) => {
    const newList = listItems.map(item =>
      item.rollNo === rollNo ? { ...item, present } : item,
    );

    setListItems(newList);
  };

  useEffect(() => {
    const callback = (e: NavigationEventListenerCallback) => {
      e.preventDefault();
      const {
        data: { action },
      } = e;

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
      }
    };

    // BUG: for some reason react-navigation is not showing the correct return type
    // expected () => removeListener(type, callback); but got () => void
    // so we are using remove listener method to clean up the event listener
    navigation.addListener('beforeRemove', callback);

    // it is necessary to remove the event free up the listener
    // or every data change useEffect will reattach the event listener with the old event
    return () => navigation.removeListener('beforeRemove', callback);
  }, [navigation]);

  return (
    <CurrentAttendanceSession
      studentList={listItems}
      onPresentChange={onPresentChange}
      showPopup={route.params.showStopDialog}
      onDismissPopup={() => {
        navigation.setParams({ showStopDialog: false });
      }}
      onPositivePopupClick={() => {
        navigation.navigate('TeacherClassList', { withDismiss: true });
      }}
    />
  );
};

export default CurrentAttendanceSessionPage;

import React, { useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { RootStackParamList } from '../../App';
import CurrentAttendanceSession, {
  CurrentAttendanceSessionDataProps,
} from '../../components/organisms/Teacher/CurrentAttendanceSession';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { lightColor } from '../../util/Colors';

type Props = StackScreenProps<RootStackParamList, 'CurrentAttendanceSession'>;
type OptionsProps = (props: Props) => StackNavigationOptions;

export const CurrentAttendanceSessionNavigationOptions: OptionsProps = ({
  navigation,
}) => ({
  ...SimpleHeaderBackNavigationOptions,
  title: 'Current Session',
  headerStyle: {
    backgroundColor: lightColor,
    elevation: 0,
    shadowColor: lightColor,
    // borderBottomColor: '#ddd',
    // borderBottomWidth: 1,
  },
  headerTitleStyle: { color: '#000', marginTop: 20 },
  headerLeft: () => (
    <IconButton
      icon="close"
      onPress={() => navigation.canGoBack() && navigation.goBack()}
      color="#000"
    />
  ),
  headerLeftContainerStyle: {
    marginTop: 20,
  },
  headerRight: () => (
    <View style={{ paddingRight: 16 }}>
      {/* <Button
        title="stop"
        onPress={() =>
          navigation.setParams({
            showStopDialog: true,
          })
        }
      /> */}
      <Button
        // style={{ width: '70%' }}
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

  return (
    <CurrentAttendanceSession
      studentList={listItems}
      onPresentChange={onPresentChange}
      showPopup={route.params.showStopDialog}
      onDismissPopup={() => navigation.setParams({ showStopDialog: false })}
      onPositivePopupClick={() => {
        navigation.navigate('TeacherClassList');
      }}
    />
  );
};

export default CurrentAttendanceSessionPage;

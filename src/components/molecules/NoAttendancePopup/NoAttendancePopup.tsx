import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Dialog } from 'react-native-paper';
import AntIcon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  largeImage: {
    height: Dimensions.get('window').height * 0.3,
    width: Dimensions.get('window').width * 0.6,
  },
  popupTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
    marginTop: 15,
    textAlign: 'center',
  },
  popupText: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export interface NoAttendancePopupPops {
  onCancelClick: () => void;
  visible: boolean;
  onDismiss: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSource = require('../../../../assets/images/attendanceNotStarted.png');

const NoAttendancePopup: React.FC<NoAttendancePopupPops> = ({
  visible,
  onCancelClick,
  onDismiss,
}): JSX.Element => {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <View style={styles.centeredView}>
        <View style={styles.icon}>
          <AntIcon
            name="close"
            color="#6A6A6A"
            size={25}
            onPress={onCancelClick}
          />
        </View>
        <Image source={imageSource} style={styles.largeImage} />
        <Text style={styles.popupTitle}>Oopss....</Text>
        <Text style={styles.popupText}>No attendance session is going on</Text>
      </View>
    </Dialog>
  );
};

export default NoAttendancePopup;

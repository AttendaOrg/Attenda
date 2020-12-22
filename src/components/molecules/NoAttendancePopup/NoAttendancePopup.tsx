import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginLeft: 25,
    marginRight: 25,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    alignItems: 'flex-end',
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
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSource = require('../../../../assets/images/attendanceNotStarted.png');

const NoAttendancePopup: React.FC<NoAttendancePopupPops> = ({
  onCancelClick,
}): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.popupView}>
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
            <Text style={styles.popupText}>
              No attendance session is going on
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NoAttendancePopup;

import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

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
    width: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#2196F3',
    width: 100,
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  popupTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  popupText: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
});

export interface SingelButtonPopupPops {
  title: string;
  text: string;
  positiveButtonText: string;
  negativeButtonText: string;
  onPositiveButtonClick: () => void;
  onNegativeButtonClick: () => void;
}

const SingalButtonPopup: React.FC<SingelButtonPopupPops> = ({
  title = 'Delete class',
  text = 'Are you sure to delete?',
  positiveButtonText = 'Ok',
  negativeButtonText = 'Cancel',
  onPositiveButtonClick,
  onNegativeButtonClick,
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
            <Text style={styles.popupTitle}>{title}</Text>
            <Text style={styles.popupText}>{text}</Text>

            <View style={styles.buttonRow}>
              <TouchableHighlight
                style={styles.button}
                onPress={onNegativeButtonClick}
              >
                <Text style={styles.buttonText}>{negativeButtonText}</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={onPositiveButtonClick}
              >
                <Text style={styles.buttonText}>{positiveButtonText}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SingalButtonPopup;

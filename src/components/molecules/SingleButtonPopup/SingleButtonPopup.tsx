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
    marginLeft: 25,
    marginRight: 25,
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
  button: {
    backgroundColor: '#2196F3',
    width: 100,
    borderRadius: 5,
    padding: 10,
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
  buttonText: string;
  onButtonClick: () => void;
}

const SingalButtonPopup: React.FC<SingelButtonPopupPops> = ({
  title = 'Success',
  text = 'Your password has been sent through email. Please check your mail.',
  buttonText = 'Ok',
  onButtonClick,
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

            <TouchableHighlight style={styles.button} onPress={onButtonClick}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SingalButtonPopup;

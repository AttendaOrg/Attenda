import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dialog } from 'react-native-paper';

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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

export interface DoubleButtonPopupPops {
  visible: boolean;
  title: string;
  text: string;
  positiveButtonText: string;
  negativeButtonText: string;
  onPositiveButtonClick: () => void;
  onNegativeButtonClick: () => void;
  onDismiss: () => void;
}

const DoubleButtonPopup: React.FC<DoubleButtonPopupPops> = ({
  visible,
  title = 'Delete class',
  text = 'Are you sure to delete?',
  positiveButtonText = 'Ok',
  negativeButtonText = 'Cancel',
  onPositiveButtonClick,
  onNegativeButtonClick,
  onDismiss,
}): JSX.Element => {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <View style={styles.centeredView}>
        <Text style={styles.popupTitle}>{title}</Text>
        <Text style={styles.popupText}>{text}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={onNegativeButtonClick}
          >
            <Text style={styles.buttonText}>{negativeButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={onPositiveButtonClick}
          >
            <Text style={styles.buttonText}>{positiveButtonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog>
  );
};

export default DoubleButtonPopup;

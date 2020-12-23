import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Dialog } from 'react-native-paper';

const styles = StyleSheet.create({
  centeredView: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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

export interface SingleButtonPopupPops {
  visible: boolean;
  title: string;
  text: string;
  buttonText: string;
  onButtonClick: () => void;
  onDismiss: () => void;
}

const SingleButtonPopup: React.FC<SingleButtonPopupPops> = ({
  visible,
  title = 'Success',
  text = 'Your password has been sent through email. Please check your mail.',
  buttonText = 'Ok',
  onButtonClick,
  onDismiss,
}): JSX.Element => {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <View style={styles.centeredView}>
        <Text style={styles.popupTitle}>{title}</Text>
        <Text style={styles.popupText}>{text}</Text>

        <TouchableHighlight style={styles.button} onPress={onButtonClick}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableHighlight>
      </View>
    </Dialog>
  );
};

export default SingleButtonPopup;

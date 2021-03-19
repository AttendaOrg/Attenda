import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Dialog } from 'react-native-paper';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { IconsPops } from '../../atoms/Icons';

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    position: 'absolute',
    right: 7,
    top: 7,
  },
  largeImage: {
    height: Dimensions.get('window').height * 0.4,
    width: Dimensions.get('window').width * 0.8,
  },
  popupTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  popupText: {
    fontSize: 15,
  },
});

export interface ImagePopupPops {
  visible: boolean;
  imageComponent: React.FC<IconsPops>;
  title: string;
  text: string;
  onCancelClick: () => void;
  onDismiss: () => void;
}

const ImagePopup: React.FC<ImagePopupPops> = ({
  visible,
  imageComponent: SvgImg = () => null,
  title = 'Title',
  text = 'Text',
  onCancelClick,
  onDismiss,
  children,
}): JSX.Element => {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <View style={styles.centeredView}>
        {/* <Image source={imageSource} style={styles.largeImage} /> */}
        <View style={styles.largeImage}>
          <SvgImg />
        </View>
        <View style={styles.icon}>
          <AntIcon
            name="close"
            color="#6A6A6A"
            size={25}
            onPress={onCancelClick}
          />
        </View>
        <Text style={styles.popupTitle}>{title}</Text>
        <Text style={styles.popupText}>{text}</Text>
        {children}
      </View>
    </Dialog>
  );
};

export default ImagePopup;

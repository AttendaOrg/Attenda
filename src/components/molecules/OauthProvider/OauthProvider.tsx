import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Facebook, Google, Twitter } from '../../atoms/Icons';

export interface OauthProviderProps {
  onGoogleClick: () => void;
  onFaceBookClick: () => void;
  onTwitterClick: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  imageContainer: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const OauthProvider: React.FC<OauthProviderProps> = ({
  onFaceBookClick,
  onGoogleClick,
  onTwitterClick,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onGoogleClick}>
        <View style={styles.imageContainer}>
          <Google />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onTwitterClick}>
        <View style={styles.imageContainer}>
          <Twitter />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onFaceBookClick}>
        <View style={styles.imageContainer}>
          <Facebook />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OauthProvider;

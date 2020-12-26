import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeImage: {
    height: Dimensions.get('window').height * 0.4,
    width: Dimensions.get('window').width * 0.8,
  },
  text: {
    fontWeight: 'normal',
    marginTop: 16,
    fontSize: 20,
  },
  closeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 10,
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSource = require('../../../../../assets/images/exclamation.png');

export interface TurnOnWifiPops {
  /**
   * this method is deprecated
   * @deprecated
   */
  refreshing?: boolean;
  /**
   * this method is deprecated
   * @deprecated
   */
  onRefresh?: () => void;
  onCloseBtnClick: () => void;
}

const TurnOnWifi: React.FC<TurnOnWifiPops> = ({
  onCloseBtnClick,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCloseBtnClick} style={styles.closeIcon}>
        <MaterialIcons size={24} name="close" />
      </TouchableOpacity>
      <Image source={imageSource} style={styles.largeImage} />
      <Text style={styles.text}>Turn on your wifi</Text>
    </View>
  );
};

export default TurnOnWifi;

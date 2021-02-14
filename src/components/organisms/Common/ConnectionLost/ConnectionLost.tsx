import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeImage: {
    height: Dimensions.get('window').height * 0.4,
    width: Dimensions.get('window').width * 0.8,
  },
  textUp: {
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: 20,
  },
  textDown: {
    fontWeight: 'normal',
    marginTop: 5,
    fontSize: 15,
  },
  textButton: {
    fontWeight: 'normal',
    color: '#007AFF',
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 16,
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSource = require('../../../../../assets/images/connectionLost.jpg');

export interface ConnectionLostPops {
  onRetryClick: () => void;
}

const ConnectionLost: React.FC<ConnectionLostPops> = ({
  onRetryClick,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.largeImage} />
      <Text style={styles.textUp}>Connection Lost</Text>
      <Text style={styles.textDown}>
        You are offline. Check your connection.
      </Text>
      <TouchableOpacity onPress={onRetryClick} style={styles.buttonContainer}>
        <Text style={styles.textButton}>RETRY</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectionLost;

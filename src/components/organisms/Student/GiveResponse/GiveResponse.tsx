import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  StyleProp,
  TextStyle,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeImage: {
    height: Dimensions.get('window').height * 0.6,
    width: Dimensions.get('window').width,
  },
  btnContainerStyle: {
    width: '50%',
    // marginVertical: 10,
    marginTop: 40,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSource = require('../../../../../assets/images/giveResponse.png');

export enum GiveResponseLoadingState {
  DEFAULT,
  TURING_ON_WIFI,
  SEARCHING_TEACHER,
}

export interface GiveResponsePops {
  loadingState?: GiveResponseLoadingState;
}

const LoadingText: React.FC<{ style?: StyleProp<TextStyle> }> = ({
  children,
  style,
}) => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (num >= 5) {
        setNum(0);
      } else setNum(num + 1);
    }, 500);

    return () => clearInterval(timerId);
  }, [num]);

  return (
    <Text style={style}>
      {children} {new Array(num).fill('.').join('')}
    </Text>
  );
};

const GiveResponse: React.FC<GiveResponsePops> = ({
  loadingState = GiveResponseLoadingState.DEFAULT,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.largeImage} />
      <View style={styles.btnContainerStyle}>
        {loadingState === GiveResponseLoadingState.SEARCHING_TEACHER && (
          <LoadingText style={styles.infoText}>
            Searching for teacher
          </LoadingText>
        )}
        {loadingState === GiveResponseLoadingState.TURING_ON_WIFI && (
          <LoadingText style={styles.infoText}>Turing On Wifi</LoadingText>
        )}
      </View>
    </View>
  );
};

export default GiveResponse;

import React from 'react';
import { StyleSheet, View, Image, Dimensions, Button } from 'react-native';

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
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSource = require('../../../../../assets/images/giveResponse.png');

export interface GiveResponsePops {
  onPresentClick: () => void;
}

const GiveResponse: React.FC<GiveResponsePops> = ({
  onPresentClick,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.largeImage} />

      <View style={styles.btnContainerStyle}>
        <Button title="PRESENT" onPress={onPresentClick} />
      </View>
    </View>
  );
};

export default GiveResponse;

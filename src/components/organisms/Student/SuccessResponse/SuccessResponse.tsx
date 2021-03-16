import React from 'react';
import { Dimensions, StyleSheet, View, Button, Text } from 'react-native';
import SuccessResponseImageComponent from '../../../atoms/Images/SuccessResponseImageComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeImage: {
    height: Dimensions.get('window').height * 0.4,
    width: Dimensions.get('window').width,
  },
  textContainer: {
    marginTop: 30,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 20,
  },
  btnContainerStyle: {
    width: '50%',
    // marginVertical: 10,
    marginTop: 40,
  },
});

export interface SuccessResponsePops {
  onDoneClick: () => void;
}

const SuccessResponse: React.FC<SuccessResponsePops> = ({
  onDoneClick,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.largeImage}>
        <SuccessResponseImageComponent />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Your response is recorded</Text>
      </View>

      <View style={styles.btnContainerStyle}>
        <Button title="DONE" onPress={onDoneClick} />
      </View>
    </View>
  );
};

export default SuccessResponse;

import React from 'react';
import { Image, Dimensions, StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-paper';
import Arrow from '../../../atoms/Icons/Arrow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  largeImage: {
    height: Dimensions.get('window').height * 0.4,
    width: Dimensions.get('window').width,
  },
  aboveTextContainer: {
    flex: 1,
    alignItems: 'center', // horizontally centered
    marginTop: 20,
  },
  belowTextContainer: {
    alignItems: 'center', // horizontally centered
    marginTop: 20,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 20,
  },
  arrowContainer: {
    alignItems: 'flex-end',
    marginRight: 75,
    marginBottom: 40,
  },
  fab: {
    position: 'absolute',
    backgroundColor: '#03A9F4',
    right: 20,
    bottom: 20,
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSource = require('../../../../../assets/images/empty.png');

export interface EmptyClassPops {
  onFabClick: () => void;
}

const EmptyClass: React.FC<EmptyClassPops> = ({ onFabClick }): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.largeImage} />

      <View style={styles.aboveTextContainer}>
        <Text style={styles.text}>No class found</Text>
      </View>

      <View style={styles.belowTextContainer}>
        <Text style={styles.text}>Join your first class</Text>
      </View>

      <View style={styles.arrowContainer}>
        <Arrow />
      </View>

      <FAB
        style={styles.fab}
        color="#FFFFFF"
        icon="plus"
        onPress={onFabClick}
      />
    </View>
  );
};

export default EmptyClass;

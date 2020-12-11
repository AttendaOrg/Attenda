import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  RefreshControl,
  ScrollView,
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
    height: Dimensions.get('window').height * 0.4,
    width: Dimensions.get('window').width,
  },
  textContainer: {
    marginTop: 20,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 20,
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSource = require('../../../../../assets/images/exclamation.png');

const wait = (timeout: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const TurnOnWifi = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Image source={imageSource} style={styles.largeImage} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Turn on your wify</Text>
      </View>
    </ScrollView>
  );
};

export default TurnOnWifi;

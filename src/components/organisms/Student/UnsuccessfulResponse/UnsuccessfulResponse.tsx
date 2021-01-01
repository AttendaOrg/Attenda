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

export interface UnsuccessfulResponsePops {
  refreshing: boolean;
  onRefresh: () => void;
}

const UnsuccessfulResponse: React.FC<UnsuccessfulResponsePops> = ({
  refreshing,
  onRefresh,
}): JSX.Element => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Image source={imageSource} style={styles.largeImage} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Something went wrong</Text>
      </View>
    </ScrollView>
  );
};

export default UnsuccessfulResponse;

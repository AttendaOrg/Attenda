import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#282828',
    width: '100%',
    padding: 6,
    zIndex: 10,
  },
  txt: {
    color: '#fff',
    textAlign: 'center',
  },
});

// export interface NetworkChangeListenerPops {}

const NetworkChangeListener: React.VFC = () => {
  const netInfo = useNetInfo();

  const { isConnected } = netInfo;

  console.log(`isConnected -> ${isConnected}`);

  if (isConnected !== true)
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>You&apos;re offline</Text>
      </View>
    );

  return <></>;
};

export default NetworkChangeListener;

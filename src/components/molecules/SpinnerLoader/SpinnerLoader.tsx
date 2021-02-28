import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { primaryColor } from '../../../util/Colors';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff80',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface SpinnerLoaderProps {
  /**
   * @param show where to show the spinner by default its value is false
   * @default false
   */
  show?: boolean;
  size?: 'small' | 'large' | undefined;
}

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
  show = false,
  size = 'large',
}): JSX.Element => {
  if (show)
    return (
      <View style={styles.container}>
        <ActivityIndicator animating size={size} color={primaryColor} />
      </View>
    );

  return <></>;
};

export default SpinnerLoader;

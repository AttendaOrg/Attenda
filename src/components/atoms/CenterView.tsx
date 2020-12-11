import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeView: {
    paddingTop: StatusBar.currentHeight,
    padding: 16,
  },
});

export interface CenterViewPops {
  onlySafeView?: boolean;
}

const CenterView: React.FC<CenterViewPops> = ({
  children,
  onlySafeView = false,
}) => {
  return (
    <View style={onlySafeView ? styles.safeView : styles.container}>
      {children}
    </View>
  );
};

export default CenterView;

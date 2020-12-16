import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: 16,
  },
});

export interface CenterViewPops {
  /**
   * @deprecated this attribute is deprecated
   */
  onlySafeView?: boolean;
  noPadding?: boolean;
}

const CenterView: React.FC<CenterViewPops> = ({
  children,
  noPadding = false,
}) => {
  return (
    <View style={[styles.safeView, noPadding ? { padding: 0 } : null]}>
      {children}
    </View>
  );
};

export default CenterView;

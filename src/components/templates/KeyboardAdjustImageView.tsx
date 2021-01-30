import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  ImageSourcePropType,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import useKeyBoardOpenStatus from '../../util/hooks/KeyBoardOpenStatus';
import { CustomLayoutLinearConfig } from '../../util/Styles';

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    alignItems: 'center',
  },
  smallImage: {
    height: 100,
    width: 100,
  },
  largeImage: {
    height: Dimensions.get('screen').height * 0.4,
    width: Dimensions.get('screen').height * 0.44,
  },
});

export interface KeyboardAdjustImageViewPops {
  imageSource: ImageSourcePropType;
}

const KeyboardAdjustImageView: React.FC<KeyboardAdjustImageViewPops> = ({
  imageSource,
}): JSX.Element => {
  const keyboardOpened = useKeyBoardOpenStatus();

  useEffect(() => {
    // for animating the height change
    LayoutAnimation.configureNext(CustomLayoutLinearConfig);

    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental !== undefined) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, [keyboardOpened]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={keyboardOpened ? styles.smallImage : styles.largeImage}
          source={imageSource}
        />
      </View>
    </View>
  );
};

export default KeyboardAdjustImageView;

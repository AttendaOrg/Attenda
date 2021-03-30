import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { isSmallDevice } from '.';
import useKeyBoardOpenStatus from '../../util/hooks/KeyBoardOpenStatus';
import { CustomLayoutLinearConfig } from '../../util/Styles';
import { IconsPops } from '../atoms/Icons';

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    alignItems: 'center',
  },
  hideImage: {
    display: 'none',
  },
});
const smallImage = {
  height: 100,
  width: 100,
};
const largeImage = {
  height: Dimensions.get('window').height * 0.4,
  width: Dimensions.get('window').height * 0.44,
};

const mediumImage = {
  height: Dimensions.get('window').height * 0.3,
  width: Dimensions.get('window').height * 0.44,
};

export interface KeyboardAdjustImageViewPops {
  svgImg: React.FC<IconsPops>;
  heightSensitive?: boolean;
}

const KeyboardAdjustImageView: React.FC<KeyboardAdjustImageViewPops> = ({
  // NOTE: remove this default for check errors
  svgImg: SvgImg = () => null,
  heightSensitive = false,
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

  const hideImage: boolean = heightSensitive
    ? isSmallDevice() && keyboardOpened === true
    : false;

  const height = keyboardOpened ? smallImage.height : largeImage.height;
  const width = keyboardOpened ? smallImage.width : largeImage.width;
  const heightSensitiveWidth = isSmallDevice() ? mediumImage.width : width;
  const heightSensitiveHeight = isSmallDevice() ? mediumImage.height : height;

  return (
    <View style={[styles.container, hideImage && styles.hideImage]}>
      <View style={styles.imageContainer}>
        <SvgImg
          height={heightSensitive ? heightSensitiveHeight : height}
          width={heightSensitive ? heightSensitiveWidth : width}
        />
      </View>
    </View>
  );
};

export default KeyboardAdjustImageView;

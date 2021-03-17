import React, { useEffect } from 'react';
import {
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
import { IconsPops } from '../atoms/Icons';

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    alignItems: 'center',
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

export interface KeyboardAdjustImageViewPops {
  /**
   * @deprecated this props is deprecated use SvgImage
   */
  imageSource?: ImageSourcePropType;
  svgImg: React.FC<IconsPops>;
}

const KeyboardAdjustImageView: React.FC<KeyboardAdjustImageViewPops> = ({
  // NOTE: remove this default for check errors
  svgImg: SvgImg = () => null,
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
        <SvgImg
          height={keyboardOpened ? smallImage.height : largeImage.height}
          width={keyboardOpened ? smallImage.width : largeImage.width}
        />
      </View>
    </View>
  );
};

export default KeyboardAdjustImageView;

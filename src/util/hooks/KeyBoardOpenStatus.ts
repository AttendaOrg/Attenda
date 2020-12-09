import { useEffect, useState } from 'react';
import { Keyboard, LayoutAnimation, Platform, UIManager } from 'react-native';
import { CustomLayoutLinearConfig } from '../Styles';

/**
 * returns keyboard opened status
 * updates when the keyboard open/closes
 */
const useKeyBoardOpenStatus = (): boolean => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setOpened(true),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setOpened(false),
    );

    LayoutAnimation.configureNext(CustomLayoutLinearConfig);

    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    return () => {
      // console.log('flush the event listener');

      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return opened;
};

export default useKeyBoardOpenStatus;

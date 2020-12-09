import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

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

    return () => {
      // console.log('flush the event listener');

      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return opened;
};

export default useKeyBoardOpenStatus;

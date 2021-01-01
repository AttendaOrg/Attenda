import { EventArg, NavigationProp } from '@react-navigation/native';
import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';

// find a better way to get the prop of callback
// eslint-disable-next-line @typescript-eslint/ban-types
export type NavigationEventListenerCallback<T = object> = EventArg<
  'beforeRemove',
  true,
  {
    action: Readonly<{
      type: string;
      payload?: T | undefined;
      source?: string | undefined;
      target?: string | undefined;
    }>;
  }
>;

/**
 * show a alert popup to confirm if the user really want to exit out from the screen
 * @param navigation navigation
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useConfirmBack = (navigation: NavigationProp<any>): void => {
  useEffect(() => {
    const callback = (e: NavigationEventListenerCallback) => {
      e.preventDefault();

      if (Platform.OS === 'web') {
        // eslint-disable-next-line no-alert
        const success = window.confirm(
          'Are you sure you want to cancel the attendance?',
        );

        if (success) navigation.dispatch(e.data.action);
      } else
        Alert.alert(
          'Cancel The Attendance',
          'Are you sure you want to cancel the attendance?',
          [
            {
              onPress: () => navigation.dispatch(e.data.action),
              text: 'ok',
            },
          ],
          {
            cancelable: true,
          },
        );
    };

    // BUG: for some reason react-navigation is not showing the correct return type
    // expected () => removeListener(type, callback); but got () => void
    // so we are using remove listener method to clean up the event listener
    navigation.addListener('beforeRemove', callback);

    // it is necessary to remove the event free up the listener
    // or every data change useEffect will reattach the event listener with the old event
    return () => navigation.removeListener('beforeRemove', callback);
  }, [navigation]);
};

export default {
  useConfirmBack,
};

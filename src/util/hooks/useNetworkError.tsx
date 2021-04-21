import { useNetInfo } from '@react-native-community/netinfo';
import * as React from 'react';
import NoInternetSnackbar from '../../components/molecules/NoInternetSnackbar/NoInternetSnackbar';

export const useNetworkError = (): [VoidFunction, JSX.Element] => {
  const [showSnackBar, setShowSnackBar] = React.useState(false);
  const { isConnected } = useNetInfo();

  React.useEffect(() => {
    if (isConnected === true) setShowSnackBar(false);
  }, [isConnected]);

  const show = () => setShowSnackBar(true);
  const dismiss = () => setShowSnackBar(false);

  return [
    show,
    <NoInternetSnackbar visible={showSnackBar} onDismiss={dismiss} />,
  ];
};

export default {
  useNetworkError,
};

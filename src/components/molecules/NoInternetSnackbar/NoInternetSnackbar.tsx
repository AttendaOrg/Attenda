import React from 'react';
import { Snackbar } from 'react-native-paper';

interface Props {
  visible: boolean;
  onDismiss: VoidFunction;
}

const NoInternetSnackbar: React.VFC<Props> = ({ onDismiss, visible }) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      wrapperStyle={{ marginBottom: 25 }}
    >
      Please check your internet connectivity and try again.
    </Snackbar>
  );
};

export default NoInternetSnackbar;

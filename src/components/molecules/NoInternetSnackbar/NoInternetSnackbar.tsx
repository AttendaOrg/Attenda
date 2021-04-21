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
      You are offline please connect to the internet and try again.
    </Snackbar>
  );
};

export default NoInternetSnackbar;

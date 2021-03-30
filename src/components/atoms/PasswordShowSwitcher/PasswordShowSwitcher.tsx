import React from 'react';
import { IconButton } from 'react-native-paper';

interface Props {
  show: boolean;
  onChange: () => void;
}

const PasswordShowSwitcher: React.FC<Props> = ({
  onChange,
  show,
}): JSX.Element => {
  return (
    <IconButton
      style={{ margin: 0 }}
      icon={show ? 'eye' : 'eye-off'}
      onPress={onChange}
    />
  );
};

export default PasswordShowSwitcher;

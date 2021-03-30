import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ClassCardActionBtn: React.FC<{ onPress: () => void }> = ({
  children,
  onPress = () => null,
}) => (
  <TouchableOpacity
    style={{ paddingLeft: 16, paddingVertical: 6 }}
    onPress={onPress}
  >
    <Text style={{ color: '#007AFF' }}>{children}</Text>
  </TouchableOpacity>
);

export default ClassCardActionBtn;

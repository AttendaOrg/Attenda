import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { IconButton, TouchableRipple } from 'react-native-paper';
import { primaryColor } from '../../../util/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    justifyContent: 'space-between',
  },
  containMain: {
    flexDirection: 'row',
    paddingVertical: 6,
    alignItems: 'center',
  },
  textContain: {
    paddingHorizontal: 8,
  },
});

export interface StudentListPops {
  avatar?: ImageSourcePropType;
  name: string;
  rollNo: string;
  checked: boolean;
  showChecked?: boolean;
  onChangeChecked: (active: boolean) => void;
  onProfileClick: () => void;
  onLogPress: () => void;
}

const StudentListItem: React.FC<StudentListPops> = ({
  avatar,
  name,
  rollNo,
  checked,
  showChecked,
  onChangeChecked,
  onLogPress,
  onProfileClick,
}): JSX.Element => {
  const userProfileImage = avatar ? (
    <Image source={avatar} />
  ) : (
    <MaterialIcons name="account-circle" size={34} />
  );

  return (
    <TouchableRipple
      onPress={() => {
        // if the mode is checked pass the click event
        if (showChecked) onChangeChecked(!checked);
        //
        else onProfileClick();
      }}
      onLongPress={onLogPress}
    >
      <View style={styles.container}>
        <View style={styles.containMain}>
          {userProfileImage}
          <View style={styles.textContain}>
            <Text>{name}</Text>
            <Text>Roll No: {rollNo}</Text>
          </View>
        </View>

        {showChecked && (
          <IconButton
            icon={() => (
              <MaterialIcons
                name={
                  checked ? 'radio-button-checked' : 'radio-button-unchecked'
                }
                size={24}
                color={primaryColor}
              />
            )}
            onPress={() => onChangeChecked(!checked)}
          />
        )}
      </View>
    </TouchableRipple>
  );
};

export default StudentListItem;

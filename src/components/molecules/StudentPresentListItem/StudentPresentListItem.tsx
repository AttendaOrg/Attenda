import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
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
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export interface StudentPresentListItemPops {
  avatar?: ImageSourcePropType;
  name: string;
  rollNo: string;
  present: boolean;
  onPresentChange: (preset: boolean) => void;
}

const StudentPresentListItem: React.FC<StudentPresentListItemPops> = ({
  avatar,
  name,
  rollNo,
  present,
  onPresentChange = () => null,
}): JSX.Element => {
  const userProfileImage =
    avatar !== undefined ? (
      <Image source={avatar} style={{ borderRadius: 100 }} />
    ) : (
      <MaterialIcons name="account-circle" size={34} />
    );

  const rightSide = (
    <View style={styles.actionContainer}>
      <Text>{present ? 'Present' : 'Absent'}</Text>
      <IconButton
        icon={() => (
          <MaterialIcons
            name={present ? 'radio-button-checked' : 'radio-button-unchecked'}
            size={24}
            color={present ? primaryColor : 'red'}
          />
        )}
        onPress={() => onPresentChange(!present)}
      />
    </View>
  );

  return (
    <TouchableRipple
      onPress={() => {
        onPresentChange(!present);
      }}
      onLongPress={() => {
        onPresentChange(!present);
      }}
    >
      <View style={styles.container}>
        <View style={styles.containMain}>
          {userProfileImage}
          <View style={styles.textContain}>
            <Text>{name}</Text>
            <Text>Roll No: {rollNo}</Text>
          </View>
        </View>

        {rightSide}
      </View>
    </TouchableRipple>
  );
};

export default StudentPresentListItem;

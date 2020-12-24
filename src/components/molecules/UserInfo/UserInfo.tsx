import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { ImageSource } from 'react-native-vector-icons/Icon';
import { MaterialIcons } from '@expo/vector-icons';
import { lightColor } from '../../../util/Colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: lightColor,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rollNo: {
    fontSize: 14,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  editRollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 6,
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSrc = require('../../../../assets/images/study.png');

export interface UserInfoPops {
  userImage: ImageSource;
  name: string;
  rollNo: string;
  onRollChange: (newRollNo: string) => void;
}

const UserInfo: React.FC<UserInfoPops> = ({
  userImage = imageSrc,
  name,
  rollNo,
  onRollChange,
}): JSX.Element => {
  const [isRollNoEditing, setIsRollNoEditing] = useState(false);
  const [_rollNo, setRollNo] = useState(rollNo);

  const action = isRollNoEditing ? (
    <TouchableOpacity
      style={{ marginHorizontal: 6 }}
      onPress={() => {
        setIsRollNoEditing(false);
        onRollChange(_rollNo);
        // reset it ???
        setRollNo(_rollNo);
      }}
    >
      <MaterialIcons name="done" size={20} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={{ marginHorizontal: 6 }}
      onPress={() => setIsRollNoEditing(true)}
    >
      <MaterialIcons name="edit" size={20} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={userImage} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.editRollContainer}>
        <Text>Roll No:</Text>
        {isRollNoEditing ? (
          <TextInput
            value={_rollNo}
            onChangeText={setRollNo}
            style={{ borderBottomColor: '#000', borderBottomWidth: 1 }}
          />
        ) : (
          <Text style={styles.rollNo}>{rollNo}</Text>
        )}
        {action}
      </View>
    </View>
  );
};

export default UserInfo;

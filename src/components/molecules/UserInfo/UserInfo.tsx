import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageSourcePropType,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { lightColor } from '../../../util/Colors';
import ProfileImage from '../ProfileImage/ProfileImage';

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
    height: 200,
    width: 200,
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
const imageSrc = require('../../../../assets/images/user.jpg');

export interface UserInfoPops {
  userImage: ImageSourcePropType;
  name: string;
  rollNo: string;
  onRollChange: (newRollNo: string) => Promise<void>;
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
      onPress={async () => {
        await onRollChange(_rollNo);
        setIsRollNoEditing(false);
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

  useEffect(() => {
    setRollNo(rollNo);
  }, [rollNo]);

  return (
    <View style={styles.container}>
      <ProfileImage avatar={userImage} height={styles.image.height} />
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
          <Text style={styles.rollNo}>{_rollNo}</Text>
        )}
        {action}
      </View>
    </View>
  );
};

export default UserInfo;

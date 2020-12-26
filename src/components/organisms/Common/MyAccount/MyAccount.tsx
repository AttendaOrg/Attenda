import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurBackground: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  profileImgContainer: {
    padding: 25,
  },
  profileImg: {
    height: 200,
    width: 200,
    borderRadius: 200,
  },
  iconContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    right: 15 + 25,
    bottom: 15 + 25,
    borderRadius: 100,
    padding: 8,
  },
  infoContainer: {
    margin: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#6A6A6A',
  },
  infoValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'black',
  },
  touchableOpacityContainer: {
    flex: 1,
    margin: 16,
    justifyContent: 'center',
  },
  touchableOpacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  touchableOpacityText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'black',
  },
  divider: {
    borderBottomColor: '#ddd',
    marginTop: 7,
    marginBottom: 12,
    borderBottomWidth: 1,
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSrc = require('../../../../../assets/images/drawer-back.png');

export interface MyAccountPops {
  username: string;
  email: string;
  studentRole: string;
  onEditProfilePictureClick: () => void;
  onEditUsernameClick: () => void;
  onChangePasswordClick: () => void;
  onLogOutClick: () => void;
}

const MyAccount: React.FC<MyAccountPops> = ({
  username,
  email,
  studentRole,
  onEditProfilePictureClick,
  onEditUsernameClick,
  onChangePasswordClick,
  onLogOutClick,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.blurImageContainer}>
        <Image
          blurRadius={Platform.OS === 'ios' ? 25 : 15}
          source={imageSrc}
          style={styles.blurBackground}
        />
        <View style={styles.profileImgContainer}>
          <Image source={imageSrc} style={styles.profileImg} />
          <Icon
            name="edit"
            color="#6A6A6A"
            containerStyle={styles.iconContainer}
            onPress={onEditProfilePictureClick}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Username</Text>
        <View style={styles.infoValueRow}>
          <Text style={styles.infoValue}>{username} </Text>
          <AntDesign
            name="edit"
            color="#6A6A6A"
            size={24}
            onPress={onEditUsernameClick}
          />
        </View>
        <View style={styles.divider} />
        <Text style={styles.infoTitle}>Email Address</Text>
        <View style={styles.infoValueRow}>
          <Text style={styles.infoValue}>{email}</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.infoTitle}>Role</Text>
        <View style={styles.infoValueRow}>
          <Text style={styles.infoValue}>{studentRole}</Text>
        </View>
        <View style={styles.divider} />
      </View>

      <View style={styles.touchableOpacityContainer}>
        <TouchableOpacity onPress={onChangePasswordClick}>
          <View style={styles.touchableOpacityRow}>
            <AntDesign name="unlock" color="#6A6A6A" size={24} />
            <Text style={styles.touchableOpacityText}> Change Password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogOutClick}>
          <View style={styles.touchableOpacityRow}>
            <AntDesign name="logout" color="#6A6A6A" size={24} />
            <Text style={styles.touchableOpacityText}> Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyAccount;

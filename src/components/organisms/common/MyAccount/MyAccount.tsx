import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import KeyboardAdjustImageView from '../../../templates/KeyboardAdjustImageView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  infoContainer: {
    marginEnd: 20,
    marginStart: 20,
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
    justifyContent: 'center',
    marginEnd: 20,
    marginStart: 20,
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
    borderBottomWidth: 2,
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSrc = require('../../../../../assets/images/study.png');

export interface MyAccountPops {
  username: string;
  email: string;
  studentRole: string;
  onEditUsernameClick: () => void;
  onChangePasswordClick: () => void;
  onLogOutClick: () => void;
}

const MyAccount: React.FC<MyAccountPops> = ({
  username,
  email,
  studentRole,
  onEditUsernameClick,
  onChangePasswordClick,
  onLogOutClick,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView imageSource={imageSrc} />

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

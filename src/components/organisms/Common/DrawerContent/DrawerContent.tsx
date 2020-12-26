/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Divider, List } from 'react-native-paper';
import { lightColor } from '../../../../util/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImageContainer: {
    height: 180,
  },
  backgroundImage: {
    height: 180,
    width: '100%',
    position: 'absolute',
  },
  imageContainer: {
    padding: 16,
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginBottom: 10,
  },
  textName: {
    fontSize: 18,
    color: lightColor,
    // marginTop: 6,
  },
  textEmail: {
    fontSize: 15,
    color: lightColor,
    // marginTop: 6,
  },
});

export enum DrawerListItems {
  CLASSES,
  MY_ACCOUNT,
  CONTACT_US,
  PRIVACY_POLICY,
  TERMS_OF_SERVICE,
}

export interface DrawerContentPops {
  name: string;
  email: string;
  avatar?: ImageSourcePropType;
  onListItemCLick: (item: DrawerListItems) => void;
}

const DrawerContent: React.FC<DrawerContentPops> = ({
  name,
  email,
  avatar = require('../../../../../assets/icon.png'),
  onListItemCLick,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image
          source={require('../../../../../assets/images/drawer-back.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.imageContainer}>
          <Image source={avatar} style={styles.avatarImage} />
          <Text style={styles.textName}>{name}</Text>
          <Text style={styles.textEmail}>{email}</Text>
        </View>
      </View>
      <List.Item
        title="Classes"
        left={props => <List.Icon {...props} icon="home" />}
        onPress={() => onListItemCLick(DrawerListItems.CLASSES)}
      />
      <List.Item
        title="My Account"
        left={props => <List.Icon {...props} icon="account-box" />}
        onPress={() => onListItemCLick(DrawerListItems.MY_ACCOUNT)}
      />
      <Divider />
      <List.Item
        title="Contact Us"
        left={props => <List.Icon {...props} icon="email" />}
        onPress={() => onListItemCLick(DrawerListItems.CONTACT_US)}
      />
      <List.Item
        title="Privacy Policy"
        left={props => <List.Icon {...props} icon="lock" />}
        onPress={() => onListItemCLick(DrawerListItems.PRIVACY_POLICY)}
      />
      <List.Item
        title="Terms of service"
        left={props => <List.Icon {...props} icon="format-list-numbered" />}
        onPress={() => onListItemCLick(DrawerListItems.TERMS_OF_SERVICE)}
      />
    </View>
  );
};

export default DrawerContent;

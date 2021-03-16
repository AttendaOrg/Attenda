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
import DrawerBackgroundImageComponent from '../../../atoms/Images/DrawerBackgroundImageComponent';

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
  listItems: {
    flexGrow: 1,
  },
  appVersion: {
    padding: 16,
  },
});

export enum DrawerListItems {
  CLASSES,
  MY_ACCOUNT,
  CONTACT_US,
  PRIVACY_POLICY,
  TERMS_OF_SERVICE,
  DEBUG_SETTINGS,
  EDIT_DEBUG_SETTINGS,
}

export interface DrawerContentPops {
  name: string;
  email: string;
  avatar?: ImageSourcePropType;
  onListItemCLick: (item: DrawerListItems) => void;
  appVersion: string;
}

const DrawerContent: React.FC<DrawerContentPops> = ({
  name,
  email,
  avatar = require('../../../../../assets/images/user.jpg'),
  onListItemCLick,
  appVersion,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        {/* <Image
          source={require('../../../../../assets/images/drawer-back.png')}
          style={styles.backgroundImage}
        /> */}
        <View style={styles.backgroundImage}>
          <DrawerBackgroundImageComponent />
        </View>
        <View style={styles.imageContainer}>
          <Image source={avatar} style={styles.avatarImage} />
          <Text style={styles.textName}>{name}</Text>
          <Text style={styles.textEmail}>{email}</Text>
        </View>
      </View>
      <View style={styles.listItems}>
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

        <Divider />
        <List.Item
          title="Debug Setting"
          left={props => <List.Icon {...props} icon="format-list-numbered" />}
          onPress={() => onListItemCLick(DrawerListItems.DEBUG_SETTINGS)}
        />
        <List.Item
          title="Edit Debug Setting"
          left={props => <List.Icon {...props} icon="format-list-numbered" />}
          onPress={() => onListItemCLick(DrawerListItems.EDIT_DEBUG_SETTINGS)}
        />
      </View>
      <View style={styles.appVersion}>
        <Text style={{ textAlign: 'center' }}>App version: {appVersion}</Text>
      </View>
    </View>
  );
};

export default DrawerContent;

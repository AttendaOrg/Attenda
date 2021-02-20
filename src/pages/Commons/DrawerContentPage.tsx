import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import DrawerContent, {
  DrawerListItems,
} from '../../components/organisms/Common/DrawerContent';
import {
  TERMS_URL,
  PRIVACY_POLICY_URL,
  SUPPORT_EMAIL,
} from '../../util/constant';

type Props = DrawerContentComponentProps<DrawerContentOptions>;

const DrawerContentPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [info, setInfo] = useState({ name: '', email: '' });

  useEffect(() => {
    // TODO: get user profile pic
    firebase.auth().onAuthStateChanged(async (user: firebase.User | null) => {
      setInfo({
        email: user?.email ?? '',
        name: user?.displayName ?? '',
      });
    });
  }, []);

  const onListItemCLick = (item: DrawerListItems) => {
    switch (item) {
      case DrawerListItems.CLASSES:
        // temporary solution is to close the drawer
        // FIXME: detect the role (student/teacher) and navigate to correct class list
        navigation.dispatch(DrawerActions.closeDrawer());
        break;
      case DrawerListItems.MY_ACCOUNT:
        navigation.navigate('App', { screen: 'MyAccount' });
        break;
      case DrawerListItems.CONTACT_US:
        Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
        break;
      case DrawerListItems.PRIVACY_POLICY:
        Linking.openURL(PRIVACY_POLICY_URL);
        break;
      case DrawerListItems.TERMS_OF_SERVICE:
        Linking.openURL(TERMS_URL);

        break;
      default:
        break;
    }
  };

  const { name, email } = info;

  console.log(firebase.auth().currentUser);

  // because we update the user name after creating the account
  // on first onAuthStateChanged the name update
  // so on every time the user open the drawer we check if user name has been updated if so update it to state.
  // so the logic is if in app state user have a empty name check for displayName form current user
  const displayName = firebase.auth().currentUser?.displayName ?? '';

  if (
    // if the displayName is also empty don't try to update the state otherwise it will cause an infinity loop
    displayName?.length > 0 &&
    // if the name and displayName doesn't math the the profile name has been updated so update the app state
    name !== displayName
  ) {
    setInfo({ email, name: displayName });
  }

  return (
    <DrawerContent
      name={name}
      email={email}
      onListItemCLick={onListItemCLick}
    />
  );
};

export default DrawerContentPage;

import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import React from 'react';
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

  return (
    <DrawerContent
      name="Prasanta Barman"
      email="test@server.com"
      onListItemCLick={onListItemCLick}
    />
  );
};

export default DrawerContentPage;

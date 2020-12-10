/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import {
  Image,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: '#0d356d',
    height: 56,
  },
  iconContainer: {
    alignItems: 'flex-start',
    position: 'absolute',
    marginLeft: 10,
    marginTop: 10,
  },
  imageContainer: {
    // alignItems: 'center',
    position: 'relative',
    marginTop: 30,
  },
  largeImage: {
    height: Dimensions.get('screen').height * 0.4,
    width: Dimensions.get('screen').width,
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center', // horizontally centered
    justifyContent: 'center', // vertically centered
  },
  headlineText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
  checkBoxStyle: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
  },
});

const imageSource = require('../../../../assets/images/chooseRole.png');

export interface ChooseRolePops {
  onDoneClick?: () => void;
  onCancelClick?: () => void;
}

const EmptyClassList: React.FC<ChooseRolePops> = ({
  onDoneClick = () => null,
  onCancelClick = () => null,
}): JSX.Element => {
  const [teacherChecked, setCheckedTeacher] = useState(false);
  const [studentChecked, setCheckedStudent] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0a254b" barStyle="light-content" />
      <Icon.ToolbarAndroid
        style={styles.toolbar}
        title="superglobals.net"
        titleColor="white"
        navIconName="md-menu"
        actions={[
          {
            title: 'Settings',
            iconName: 'md-save',
            iconSize: 30,
            show: 'always',
          },
          { title: 'About', iconName: 'md-help', iconSize: 30, show: 'never' },
        ]}
        overflowIconName="md-more"
      />
      <Text>Home screen...</Text>
    </View>
  );
};

export default EmptyClassList;

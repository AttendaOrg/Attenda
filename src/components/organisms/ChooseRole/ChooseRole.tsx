/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from 'react';
import {
  Image,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: '#fff',
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
  checkBoxLabelStyle: {
    fontSize: 22,
    fontWeight: 'normal',
  },
  btnContainerStyle: {
    width: '30%',
    marginVertical: 10,
    marginTop: 40,
  },
});

const imageSource = require('../../../../assets/images/chooseRole.png');

export enum Role {
  Student,
  Teacher,
}

export interface ChooseRolePops {
  onDone: (role: Role) => void;
}

const ChooseRole: React.FC<ChooseRolePops> = ({
  onDone: onDoneClick = () => null,
}): JSX.Element => {
  // if the state is null the user didn't chose any role
  // which is by default null
  const [selected, setSelected] = useState<Role | null>(null);

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.largeImage} />

      <View style={styles.footerContainer}>
        <Text style={styles.headlineText}>Choose Your Role</Text>

        <CheckBox
          title="Teacher"
          checked={selected === Role.Teacher}
          textStyle={styles.checkBoxLabelStyle}
          containerStyle={styles.checkBoxStyle}
          onPress={() => setSelected(Role.Teacher)}
        />

        <CheckBox
          title="Student"
          checked={selected === Role.Student}
          textStyle={styles.checkBoxLabelStyle}
          containerStyle={styles.checkBoxStyle}
          onPress={() => setSelected(Role.Student)}
        />

        <View style={styles.btnContainerStyle}>
          <Button
            title="Done"
            disabled={selected === null}
            onPress={() => {
              // if the user did not chose any role don't fire the event
              if (selected !== null) onDoneClick(selected);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChooseRole;

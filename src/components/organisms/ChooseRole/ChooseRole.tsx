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
import { CheckBox, Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: '#fff',
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

const ChooseRole: React.FC<ChooseRolePops> = ({
  onDoneClick = () => null,
  onCancelClick = () => null,
}): JSX.Element => {
  const [teacherChecked, setCheckedTeacher] = useState(false);
  const [studentChecked, setCheckedStudent] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.largeImage} />
        <View style={styles.iconContainer}>
          <Icon
            name="cancel"
            size={30}
            type="material"
            color="#67B7D1"
            onPress={() => onCancelClick()}
          />
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.headlineText}>Choose Your Role</Text>

        <CheckBox
          checked={teacherChecked}
          title="Teacher"
          textStyle={[{ fontSize: 22, fontWeight: 'normal' }]}
          containerStyle={styles.checkBoxStyle}
          onPress={() => setCheckedTeacher(!teacherChecked)}
        />

        <CheckBox
          checked={studentChecked}
          title="Student"
          textStyle={[{ fontSize: 22, fontWeight: 'normal' }]}
          containerStyle={styles.checkBoxStyle}
          onPress={() => setCheckedStudent(!studentChecked)}
        />

        <View style={[{ width: '30%', marginVertical: 10, marginTop: 40 }]}>
          <Button title="Done" onPress={() => onDoneClick()} />
        </View>
      </View>
    </View>
  );
};

export default ChooseRole;

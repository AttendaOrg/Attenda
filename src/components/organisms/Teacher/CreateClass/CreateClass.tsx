/* eslint-disable global-require */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Input } from 'react-native-elements';
import { inputContainerStyle } from '../../../../util/Styles';
import KeyboardAdjustImageView from '../../../templates/KeyboardAdjustImageView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputStyle: {
    fontSize: 14,
  },
  btnContainerStyle: {
    alignItems: 'flex-end',
    marginTop: 0,
  },
});

export interface CreateClassPops {
  title: string;
  onTitleChange: (title: string) => void;
  section: string;
  onSectionChange: (section: string) => void;
  onDone: () => void;
}

const CreateClass: React.FC<CreateClassPops> = ({
  title,
  onTitleChange,
  section,
  onSectionChange,
  onDone,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView
        imageSource={require('../../../../../assets/images/createClass.png')}
      />
      <View>
        <Input
          value={title}
          keyboardType="name-phone-pad"
          style={styles.inputStyle}
          onChangeText={onTitleChange}
          containerStyle={inputContainerStyle}
          placeholder="Title"
        />

        <Input
          value={section}
          keyboardType="name-phone-pad"
          style={styles.inputStyle}
          onChangeText={onSectionChange}
          containerStyle={inputContainerStyle}
          placeholder="Section"
        />
      </View>
      <View style={styles.btnContainerStyle}>
        <Button
          style={{ width: '40%' }}
          mode="contained"
          color="#2196f3"
          onPress={onDone}
        >
          Done
        </Button>
      </View>
    </View>
  );
};

export default CreateClass;

/* eslint-disable global-require */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Input } from 'react-native-elements';
import { inputContainerStyle } from '../../../../util/Styles';
import KeyboardAdjustImageView from '../../../templates/KeyboardAdjustImageView';
import CreateClassImageComponent from '../../../atoms/Images/CreateClassImageComponent';

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
  onDone: (title: string, section: string) => void;
}

const CreateClass: React.FC<CreateClassPops> = ({ onDone }): JSX.Element => {
  const [title, setTitle] = useState('');
  const [section, setSection] = useState('');
  const [titleError, setTitleError] = useState('');

  const validate = (txt?: string): boolean => {
    if ((txt?.length ?? title.length) > 0) {
      setTitleError('');

      return true;
    }
    setTitleError("Title shouldn't be empty");

    return false;
  };

  const onPress = () => {
    if (validate()) onDone(title, section);
  };

  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView
        heightSensitive
        svgImg={CreateClassImageComponent}
      />
      <View>
        <Input
          value={title}
          style={styles.inputStyle}
          onChangeText={txt => {
            setTitle(txt);
            validate(txt);
          }}
          containerStyle={inputContainerStyle}
          placeholder="Title"
          errorMessage={titleError}
        />

        <Input
          value={section}
          style={styles.inputStyle}
          onChangeText={setSection}
          containerStyle={inputContainerStyle}
          placeholder="Section"
        />
      </View>
      <View style={styles.btnContainerStyle}>
        <Button
          style={{ width: '40%' }}
          mode="contained"
          color="#2196f3"
          onPress={onPress}
        >
          Done
        </Button>
      </View>
    </View>
  );
};

export default CreateClass;

import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
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
    minHeight: 34,
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imageSrc = require('../../../../../assets/images/study.png');

export interface JoinClassFormPops {
  joinCode?: string;
  onSubmit: (classCode: string, rollNo: string) => void;
}

const JoinClassForm: React.FC<JoinClassFormPops> = ({
  onSubmit,
  joinCode = '',
}): JSX.Element => {
  const [classCode, setClassCode] = useState(joinCode);
  const [rollNo, setRollNo] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAdjustImageView imageSource={imageSrc} />
      {!joinCode && (
        <Input
          placeholder="Class Code"
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          labelStyle={{ margin: 0 }}
          errorStyle={{ margin: 0 }}
          onChangeText={setClassCode}
        />
      )}
      <Input
        placeholder="Your Roll No"
        containerStyle={inputContainerStyle}
        style={styles.inputStyle}
        onChangeText={setRollNo}
      />
      <View style={{ alignItems: 'flex-end' }}>
        <Button
          title="DONE"
          onPress={() => {
            if ((joinCode || classCode) && rollNo)
              onSubmit(joinCode || classCode, rollNo);
          }}
        />
      </View>
    </View>
  );
};

export default JoinClassForm;

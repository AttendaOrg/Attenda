import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Dialog } from 'react-native-paper';
import SpinnerLoader from '../../../molecules/SpinnerLoader';

const styles = StyleSheet.create({
  container: { padding: 20 },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2196F3',
    width: 100,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionBtnContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  successError: {
    color: 'green',
  },
  notSuccessError: {},
  iconContainer: {
    paddingRight: 30,
  },
});

export enum InfoTextType {
  SUCCESS,
  ERROR,
}

interface ChangeClassCodeProps {
  infoText?: string;
  showDialog: boolean;
  // @default false
  showSpinner?: boolean;
  infoType?: InfoTextType;
  initialClassCode: string;
  onDismissDialog: () => void;
  onClassCodeChange: (newCode: string) => void;
  onSaveClassCode: () => void;
}

const ChangeClassCode: React.FC<ChangeClassCodeProps> = ({
  showDialog,
  initialClassCode,
  infoType = InfoTextType.ERROR,
  infoText = '',
  showSpinner = false,
  onClassCodeChange = () => null,
  onDismissDialog = () => null,
  onSaveClassCode = () => null,
}): JSX.Element => {
  return (
    <Dialog
      visible={showDialog}
      style={styles.container}
      onDismiss={onDismissDialog}
    >
      <Text style={styles.titleText}>Change Invite Code</Text>
      <Input
        value={initialClassCode}
        onChangeText={onClassCodeChange}
        placeholder="Invite Code"
        errorMessage={infoText}
        rightIconContainerStyle={styles.iconContainer}
        rightIcon={<SpinnerLoader show={showSpinner} size="small" />}
        errorStyle={
          infoType === InfoTextType.SUCCESS
            ? styles.successError
            : styles.notSuccessError
        }
      />
      <View style={styles.actionBtnContainer}>
        <TouchableOpacity style={styles.button} onPress={onSaveClassCode}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

export default ChangeClassCode;

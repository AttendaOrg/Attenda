import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import ErrorEmail from '../../atoms/Icons/ErrorEmail';

const styles = StyleSheet.create({
  container: {
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  txt: {
    paddingHorizontal: 6,
    flexShrink: 1,
    // flexWrap: 'wrap',
  },
});

interface EmailVerificationNoticeProps {
  show: boolean;
  onResendEmail: VoidFunction;
}

const EmailVerificationNotice: React.FC<EmailVerificationNoticeProps> = ({
  onResendEmail,
  show,
}) => {
  if (!show) return null;

  return (
    <View style={styles.container}>
      <ErrorEmail />
      <Text style={styles.txt}>
        Your email is not verified please verify your email.
      </Text>

      <Button
        titleStyle={{ fontSize: 14 }}
        onPress={onResendEmail}
        type="clear"
        title="Resend Email"
      />
    </View>
  );
};

export default EmailVerificationNotice;

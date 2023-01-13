import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import ErrorEmail from '../../atoms/Icons/ErrorEmail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  txt: {
    marginVertical: 16,
    textAlign: 'center',
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
      <ErrorEmail height={140} width={140} />

      <Text style={styles.txt}>
        Your email is not verified please verify your email. If you don&apos;t
        verify your email within 7 days your account will be deleted.
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

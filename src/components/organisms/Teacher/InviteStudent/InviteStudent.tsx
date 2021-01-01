import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Button, Chip, IconButton } from 'react-native-paper';
import { isValidEmail } from '../../../../util';
import { lightColor, primaryColor } from '../../../../util/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: lightColor,
  },
  emailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emailChip: {
    marginVertical: 4,
    marginLeft: 4,
  },
  inviteContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

export interface InviteStudentPops {
  onInvite: (emails: string[]) => void;
}

// using memo so the component does not do unnecessary re renders
const Emails: React.FC<{
  emails: string[];
  removeEmail: (email: string) => void;
}> = React.memo(({ emails = [], removeEmail }) => {
  // console.log('Re Rendering', 'Emails');

  const [ref, setRef] = useState<ScrollView | null>(null);

  const onContentSizeChange = () => {
    ref?.scrollToEnd({ animated: true });
  };

  const Body = (
    <View style={styles.emailsContainer}>
      {emails.map(email => (
        <Chip
          key={email}
          style={styles.emailChip}
          icon="account-circle"
          onClose={() => removeEmail(email)}
        >
          {email}
        </Chip>
      ))}
    </View>
  );

  if (emails.length === 0) return <View>{Body}</View>;

  return (
    <ScrollView ref={setRef} onContentSizeChange={onContentSizeChange}>
      {Body}
    </ScrollView>
  );
});

// making it its own component so it does prevent unnecessary re-render Re-render
const InputEmail: React.FC<{
  onAddEmail: (email: string) => void;
  emails: string[];
}> = ({ onAddEmail, emails }) => {
  // console.log('ReRendering', 'InputEmail');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const onSubmitEditing = () => {
    if (isValidEmail(email)) {
      if (emails.includes(email.trim())) {
        setError('Email already added in invite list');
      } else {
        onAddEmail(email);
        setEmail('');
        setError('');
      }
    } else {
      setError('Please Enter A Valid Email');
    }
  };

  return (
    <Input
      value={email}
      // keep focus after submit
      blurOnSubmit={false}
      errorMessage={error}
      autoCapitalize="none"
      autoCompleteType="email"
      keyboardType="email-address"
      placeholder="Enter an email"
      onSubmitEditing={onSubmitEditing}
      containerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
      onChangeText={(_email: string) => {
        setEmail(_email);
        if (emails.includes(_email))
          setError('Email already added in invite list');
        if (error) {
          if (isValidEmail(email)) setError('');
        }
      }}
      rightIcon={
        <IconButton icon="plus" color="#6A6A6A" onPress={onSubmitEditing} />
      }
    />
  );
};

const InviteStudent: React.FC<InviteStudentPops> = ({
  onInvite,
}): JSX.Element => {
  const [emails, setEmails] = useState<string[]>([]);

  const addEmail = (email: string) => {
    setEmails([...emails, email]);
  };

  // console.log('Re Rendering', 'InviteStudent');

  return (
    <View style={styles.container}>
      <Emails
        emails={emails}
        removeEmail={email => setEmails(emails.filter(e => e !== email))}
      />
      <InputEmail onAddEmail={addEmail} emails={emails} />
      <View style={styles.inviteContainer}>
        <Button
          mode="contained"
          color={primaryColor}
          onPress={() => onInvite(emails)}
          disabled={emails.length === 0}
        >
          Invite
        </Button>
      </View>
    </View>
  );
};

export default InviteStudent;

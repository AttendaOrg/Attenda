import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { inputContainerStyle } from '../../../../util/Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headlineTextContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  headlineText: {
    fontWeight: 'bold',
    color: '#2536CE',
    fontSize: 24,
  },
  captionContainer: {
    // flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  captionText: {
    width: '90%',
    fontWeight: 'normal',
    color: '#000000',
    fontSize: 18,
  },
  inputStyle: {
    fontSize: 14,
  },
});

export interface ClassSettingsPops {
  title: string;
  section: string;
  isCodeEnabled: boolean;
  isLinkEnabled: boolean;
  code: string;
  link: string;
  onTitleChange: (title: string) => void;
  onSectionChange: (section: string) => void;
  toggleCodeSwitch: (isCodeEnabled: boolean) => void;
  toggleLinkSwitch: (isLinkEnabled: boolean) => void;
  onCodeShare: (code: string) => void;
  onLinkShare: (link: string) => void;
}

const ClassSettings: React.FC<ClassSettingsPops> = ({
  title,
  section,
  isCodeEnabled,
  isLinkEnabled,
  code,
  link,
  onTitleChange,
  onSectionChange,
  toggleCodeSwitch,
  toggleLinkSwitch,
  onCodeShare,
  onLinkShare,
}): JSX.Element => {
  // const [isCodeEnabled, setIsCodeEnabled] = useState(false);
  // const toggleCodeSwitch = () =>
  //   setIsCodeEnabled(previousState => !previousState);

  // const [isLinkEnabled, setIsLinkEnabled] = useState(false);
  // const toggleLinkSwitch = () =>
  //   setIsLinkEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.headlineTextContainer}>
        <Text style={styles.headlineText}>Class Info</Text>
      </View>

      <View>
        <Input
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          placeholder="Title"
          textContentType="name"
          keyboardType="name-phone-pad"
          value={title}
          onChangeText={onTitleChange}
        />
        <Input
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          placeholder="Section"
          textContentType="name"
          keyboardType="name-phone-pad"
          value={section}
          onChangeText={onSectionChange}
        />
      </View>

      <View style={styles.headlineTextContainer}>
        <Text style={styles.headlineText}>General</Text>
      </View>

      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>Disable code</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleCodeSwitch}
          value={isCodeEnabled}
        />
      </View>

      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>Disable link</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLinkSwitch}
          value={isLinkEnabled}
        />
      </View>

      <View style={styles.captionContainer}>
        <Text style={styles.captionText} numberOfLines={1}>
          Class code : {code}
        </Text>
        <Icon
          name="share"
          type="font-awesome"
          color="#413EDA"
          style={{ marginRight: 8 }}
          onPress={onCodeShare}
        />
      </View>

      <View style={styles.captionContainer}>
        <Text style={styles.captionText} numberOfLines={1}>
          Invitation link : {link}
        </Text>
        <Icon
          name="share"
          type="font-awesome"
          color="#413EDA"
          style={{ marginEnd: 8 }}
          onPress={onLinkShare}
        />
      </View>
    </View>
  );
};

export default ClassSettings;

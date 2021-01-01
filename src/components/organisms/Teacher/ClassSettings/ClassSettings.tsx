import React from 'react';
import { StyleSheet, View, ScrollView, Text, Switch } from 'react-native';
import { Input, Icon } from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';
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
    color: '#2196f3',
    fontSize: 24,
  },
  captionContainer: {
    // flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginEnd: 8,
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
  titleErrorMsg?: string;
  section: string;
  sectionErrorMsg?: string;
  description: string;
  isShareOptionEnabled: boolean;
  // isLinkEnabled: boolean;
  code: string;
  link: string;
  onTitleChange: (title: string) => void;
  onSectionChange: (section: string) => void;
  onDescriptionChange: (description: string) => void;
  toggleShareSwitch: (isShareOptionEnabled: boolean) => void;
  // toggleLinkSwitch: (isLinkEnabled: boolean) => void;
  onCodeShare: () => void;
  onLinkShare: () => void;
}

const ClassSettings: React.FC<ClassSettingsPops> = ({
  title,
  titleErrorMsg,
  section,
  sectionErrorMsg,
  description,
  isShareOptionEnabled,
  code,
  link,
  onTitleChange,
  onSectionChange,
  onDescriptionChange,
  toggleShareSwitch,
  onCodeShare,
  onLinkShare,
}): JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headlineTextContainer}>
        <Text style={styles.headlineText}>Class Info</Text>
      </View>

      <View>
        <Input
          multiline
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          label="Title"
          // placeholder="Enter title"
          textContentType="name"
          keyboardType="name-phone-pad"
          value={title}
          onChangeText={onTitleChange}
          errorMessage={titleErrorMsg}
        />
        <Input
          multiline
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          label="Section"
          // placeholder="Enter section"
          textContentType="name"
          keyboardType="name-phone-pad"
          value={section}
          onChangeText={onSectionChange}
          errorMessage={sectionErrorMsg}
        />
        <Input
          multiline
          containerStyle={inputContainerStyle}
          style={styles.inputStyle}
          label="Description"
          // placeholder="Enter section"
          textContentType="name"
          keyboardType="name-phone-pad"
          value={description}
          onChangeText={onDescriptionChange}
        />
      </View>

      <View style={styles.headlineTextContainer}>
        <Text style={styles.headlineText}>General</Text>
      </View>

      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>Disable code and link</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#3e3e3e"
          // style={{ marginEnd: 90 }}
          onValueChange={toggleShareSwitch}
          value={isShareOptionEnabled}
        />
      </View>

      {/* <View style={styles.captionContainer}>
        <Text style={styles.captionText}>Disable link</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLinkSwitch}
          value={isLinkEnabled}
        />
      </View> */}

      <View style={styles.captionContainer}>
        <Text style={styles.captionText} numberOfLines={1}>
          Class code : {code}
        </Text>
        <Icon
          name="share"
          type="font-awesome"
          color="#2196F3"
          style={{ marginRight: 8 }}
          onPress={onCodeShare}
        />
      </View>

      <View style={styles.captionContainer}>
        <Text
          style={{
            width: '90%',
            fontWeight: 'normal',
            color: '#000000',
            fontSize: 18,
            marginBottom: 25,
          }}
          numberOfLines={1}
        >
          Invitation link : {link}
        </Text>
        <Icon
          name="share"
          type="font-awesome"
          color="#2196F3"
          style={{ marginEnd: 8 }}
          onPress={onLinkShare}
        />
      </View>
    </ScrollView>
  );
};

export default ClassSettings;

import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Switch,
  Platform,
} from 'react-native';
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
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginEnd: 8,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  captionText: {
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
  onEditClassCodeClick: () => void;
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
  onEditClassCodeClick,
}): JSX.Element => {
  const shareIconName = Platform.OS === 'web' ? 'content-copy' : 'share';

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

      <View style={styles.captionContainer}>
        <View style={styles.row}>
          <Text style={styles.captionText}>Invite code: </Text>
          <Text style={styles.captionText} selectable>
            {code}
          </Text>
        </View>

        <Icon
          name="edit"
          type="material"
          color="#2196F3"
          onPress={onEditClassCodeClick}
        />
        <View style={{ width: 8 }} />
        <Icon
          name={shareIconName}
          type="material"
          color="#2196F3"
          onPress={onCodeShare}
        />
      </View>

      <View style={styles.captionContainer}>
        <View style={styles.row}>
          <Text style={styles.captionText}>Invitation link: </Text>
          <Text style={styles.captionText} selectable>
            {link}
          </Text>
        </View>
        <Icon
          name={shareIconName}
          type="material"
          color="#2196F3"
          onPress={onLinkShare}
        />
      </View>
    </ScrollView>
  );
};

export default ClassSettings;

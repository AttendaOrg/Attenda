import React, { useCallback, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { Share, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { RootStackParamList } from '../../App';
import ClassSettings from '../../components/organisms/Teacher/ClassSettings';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { lightColor } from '../../util/Colors';

type Props = StackScreenProps<RootStackParamList, 'ClassSettings'>;

export const ClassSettingsNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Class Settings',
};

const ClassSettingsPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [initialTitle, setInitialTitle] = useState(
    'Computer science data structures and algorithms',
  );
  const [initialSection, setInitialSection] = useState('CED/COE');
  const [title, setTitle] = useState(initialTitle);
  const [section, setSection] = useState(initialSection);
  const [sectionErrorMsg, setSectionErrorMsg] = useState('');
  const [titleErrorMsg, setTitleErrorMsg] = useState('');

  const onCodeShare = () => {
    try {
      Share.share({ message: 'A454SDS', title: 'Class Code' });
    } catch (error) {
      //   console.log(error);
    }
  };

  const onLinkShare = () => {
    try {
      Share.share({
        message: 'https://attenda.app.to/A454SDS',
        url: 'https://attenda.app.to/A454SDS',
        title: 'Class Code Link',
      });
    } catch (error) {
      //   console.log(error);
    }
  };

  const showSaveBtn = useCallback(
    (): boolean => initialTitle !== title || initialSection !== section,
    [initialSection, initialTitle, section, title],
  );

  const updateClassInfo = useCallback(() => {
    setInitialSection(section);
    setInitialTitle(title);
  }, [section, title]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <View style={{ display: showSaveBtn() ? 'flex' : 'none' }}>
          <IconButton
            color={tintColor || lightColor}
            icon="check"
            onPress={updateClassInfo}
          />
        </View>
      ),
    });
  }, [navigation, showSaveBtn, updateClassInfo]);

  /**
   * show error message if the class title/section is empty
   * @param param \{ title = undefined, section = undefined}
   */
  const showErrorMsg = ({
    title: _title = undefined,
    section: _section = undefined,
  }: {
    title?: string;
    section?: string;
  }) => {
    if (_section !== undefined) {
      if (_section === '') setSectionErrorMsg("Section can't be Empty");
      else setSectionErrorMsg('');
    }
    if (_title !== undefined) {
      if (_title === '') setTitleErrorMsg("Class Title can't be empty");
      else setTitleErrorMsg('');
    }
  };

  const onTitleChange = (text: string) => {
    setTitle(text);
    showErrorMsg({
      title: text,
    });
  };

  const onSectionChange = (text: string) => {
    setSection(text);
    showErrorMsg({
      section: text,
    });
  };

  return (
    <ClassSettings
      title={title}
      titleErrorMsg={titleErrorMsg}
      section={section}
      sectionErrorMsg={sectionErrorMsg}
      isCodeEnabled
      isLinkEnabled
      code="A454SDS"
      link="https://attenda.app.to/A454SDS"
      onTitleChange={onTitleChange}
      onSectionChange={onSectionChange}
      toggleCodeSwitch={() => null}
      toggleLinkSwitch={() => null}
      onCodeShare={onCodeShare}
      onLinkShare={onLinkShare}
    />
  );
};

export default ClassSettingsPage;

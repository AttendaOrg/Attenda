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
import DoubleButtonPopup from '../../components/molecules/DoubleButtonPopup';
import { NavigationEventListenerCallback } from '../../util/hooks/useConfirmBack';

type Props = StackScreenProps<RootStackParamList, 'ClassSettings'>;

export const ClassSettingsNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Class Settings',
};

const ClassSettingsPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const [prevTitle, setPrevTitle] = useState(
    'Computer science data structures and algorithms',
  );
  const [prevSection, setPrevSection] = useState('CED/COE');
  const [prevDescription, setPrevDescription] = useState(
    'description can be anything',
  );
  const [currentTitle, setCurrentTitle] = useState(prevTitle);
  const [currentSection, setCurrentSection] = useState(prevSection);
  const [currentDescription, setCurrentDescription] = useState(prevDescription);
  const [titleErrorMsg, setTitleErrorMsg] = useState('');
  const [sectionErrorMsg, setSectionErrorMsg] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

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

  const hasUnsavedChanges = useCallback(
    (): boolean =>
      prevTitle !== currentTitle ||
      prevSection !== currentSection ||
      prevDescription !== currentDescription,
    [
      prevTitle,
      prevSection,
      prevDescription,
      currentTitle,
      currentSection,
      currentDescription,
    ],
  );

  const updateClassInfo = useCallback(() => {
    setPrevTitle(currentTitle);
    setPrevSection(currentSection);
    setPrevDescription(currentDescription);
  }, [currentTitle, currentSection, currentDescription]);

  const dismissSaveDialog = () => setShowSaveDialog(false);

  const discardChanges = () => {
    setCurrentTitle(prevTitle);
    setCurrentSection(prevSection);
    setCurrentDescription(prevDescription);
    setShowSaveDialog(false);
  };

  const onPositiveButtonClick = () => {
    updateClassInfo();
    dismissSaveDialog();
  };

  const onGoBack = useCallback(() => {
    if (hasUnsavedChanges()) {
      setShowSaveDialog(true);
    } else {
      navigation.goBack();
    }
  }, [hasUnsavedChanges, navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <View style={{ display: hasUnsavedChanges() ? 'flex' : 'none' }}>
          <IconButton
            color={tintColor || lightColor}
            icon="check"
            onPress={updateClassInfo}
          />
        </View>
      ),
    });

    const callback = (e: NavigationEventListenerCallback) => {
      if (hasUnsavedChanges()) {
        setShowSaveDialog(true);
        // prevent from going back
        e.preventDefault();
      }
    };

    // BUG: for some reason react-navigation is not showing the correct return type
    // expected () => removeListener(type, callback); but got () => void
    // so we are using remove listener method to clean up the event listener
    navigation.addListener('beforeRemove', callback);

    // it is necessary to remove the event free up the listener
    // or every data change useEffect will reattach the event listener with the old event
    return () => navigation.removeListener('beforeRemove', callback);
  }, [navigation, hasUnsavedChanges, updateClassInfo, onGoBack]);

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
    if (_title !== undefined) {
      if (_title === '') setTitleErrorMsg("Class Title can't be empty");
      else setTitleErrorMsg('');
    }
    if (_section !== undefined) {
      if (_section === '') setSectionErrorMsg("Section can't be Empty");
      else setSectionErrorMsg('');
    }
  };

  const onTitleChange = (text: string) => {
    setCurrentTitle(text);
    showErrorMsg({
      title: text,
    });
  };

  const onSectionChange = (text: string) => {
    setCurrentSection(text);
    showErrorMsg({
      section: text,
    });
  };

  const onDescriptionChange = (text: string) => {
    setCurrentDescription(text);
  };

  return (
    <>
      <ClassSettings
        title={currentTitle}
        section={currentSection}
        description={currentDescription}
        titleErrorMsg={titleErrorMsg}
        sectionErrorMsg={sectionErrorMsg}
        isShareOptionEnabled
        code="A454SDS"
        link="https://attenda.app.to/A454SDS"
        onTitleChange={onTitleChange}
        onSectionChange={onSectionChange}
        onDescriptionChange={onDescriptionChange}
        toggleShareSwitch={() => null}
        onCodeShare={onCodeShare}
        onLinkShare={onLinkShare}
      />
      <DoubleButtonPopup
        onDismiss={dismissSaveDialog}
        visible={showSaveDialog}
        negativeButtonText="Discard"
        onPositiveButtonClick={onPositiveButtonClick}
        onNegativeButtonClick={discardChanges}
        positiveButtonText="Save"
        title="Discard Changes ?"
        text="You have some unsaved changes."
      />
    </>
  );
};

export default ClassSettingsPage;

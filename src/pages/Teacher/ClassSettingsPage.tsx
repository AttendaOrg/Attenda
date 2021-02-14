import React from 'react';
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
import { teacherApi } from '../../api/TeacherApi';
import TeacherClassModel, {
  TeacherClassModelProps,
} from '../../api/TeacherApi/model/TeacherClassModel';

type Props = StackScreenProps<RootStackParamList, 'ClassSettings'>;

export const ClassSettingsNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'Class Settings',
};

interface State {
  currentInfo: TeacherClassModelProps;
  prevInfo: TeacherClassModelProps;
  showDiscardPopupError: boolean;
  error: {
    title: string;
    section: string;
  };
}

class ClassSettingsPage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showDiscardPopupError: false,
      currentInfo: {
        section: '',
        teacherId: '',
        title: '',
        description: '',
        classCode: '',
        classId: '',
        currentSessionId: '',
      },
      prevInfo: {
        section: '',
        teacherId: '',
        title: '',
        description: '',
        classCode: '',
        classId: '',
        currentSessionId: '',
      },
      error: { section: '', title: '' },
    };
  }

  async componentDidMount(): Promise<void> {
    const { navigation } = this.props;

    await this.fetchUpdateClassInfo();

    // BUG: for some reason react-navigation is not showing the correct return type
    // expected () => removeListener(type, callback); but got () => void
    // so we are using remove listener method to clean up the event listener
    navigation.addListener('beforeRemove', this.callback);
  }

  componentWillUnmount(): void {
    const { navigation } = this.props;

    navigation.removeListener('beforeRemove', this.callback);
  }

  callback = (e: NavigationEventListenerCallback): void => {
    if (this.hasUnsavedChanges()) {
      this.setState({ showDiscardPopupError: true });
      // prevent from going back
      e.preventDefault();
    }
  };

  getClassId = (): string => {
    const {
      route: {
        params: { classId },
      },
    } = this.props;

    return classId;
  };

  // #region network calls
  updateClassInfo = async (): Promise<void> => {
    const {
      currentInfo: {
        title = '',
        section = '',
        description = '',
        isActiveInvite,
      },
    } = this.state;
    const {
      route: {
        params: { classId },
      },
    } = this.props;

    await teacherApi.updateClass(
      classId,
      TeacherClassModel.Update({ title, section, description, isActiveInvite }),
    );
    await this.fetchUpdateClassInfo();
    this.updateHeader();
  };

  fetchUpdateClassInfo = async (): Promise<void> => {
    const {
      route: {
        params: { classId },
      },
    } = this.props;

    const [info] = await teacherApi.getClassInfo(classId);

    if (info !== null)
      this.setState({
        currentInfo: info.toJson(),
        prevInfo: info.toJson(),
      });
  };
  //#endregion network calls

  // #region header related stuff
  hasUnsavedChanges = (): boolean => {
    const {
      prevInfo: {
        title: prevTitle,
        section: prevSection,
        description: prevDescription,
      },
      currentInfo: {
        title: currentTitle,
        section: currentSection,
        description: currentDescription,
      },
    } = this.state;

    return (
      prevTitle !== currentTitle ||
      prevSection !== currentSection ||
      prevDescription !== currentDescription
    );
  };

  updateHeader = (): void => {
    const { navigation } = this.props;

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <View style={{ display: this.hasUnsavedChanges() ? 'flex' : 'none' }}>
          <IconButton
            color={tintColor ?? lightColor}
            icon="check"
            onPress={this.updateClassInfo}
          />
        </View>
      ),
    });
  };

  onPositiveButtonClick = async (): Promise<void> => {
    await this.updateClassInfo();
    this.dismissSaveDialog();
  };
  // #endregion header related stuff

  // #region change handler

  onTitleChange = (title: string): void => {
    this.setState(
      prevState => ({
        ...prevState,
        currentInfo: { ...prevState.currentInfo, title },
      }),
      this.updateHeader,
    );
  };

  onSectionChange = (section: string): void => {
    this.setState(
      prevState => ({
        ...prevState,
        currentInfo: { ...prevState.currentInfo, section },
      }),
      this.updateHeader,
    );
  };

  onDescriptionChange = (description: string): void => {
    this.setState(
      prevState => ({
        ...prevState,
        currentInfo: { ...prevState.currentInfo, description },
      }),
      this.updateHeader,
    );
  };

  // #endregion change handler

  // #region class code
  onCodeShare = (): void => {
    const classId = this.getClassId();

    try {
      // TODO: create a message to explain the action
      Share.share({ message: classId, title: 'Class Code' });
    } catch (error) {
      //   console.log(error);
    }
  };

  onLinkShare = (): void => {
    try {
      // TODO: generate valid link
      Share.share({
        message: 'https://attenda.app.to/A454SDS',
        url: 'https://attenda.app.to/A454SDS',
        title: 'Class Code Link',
      });
    } catch (error) {
      //   console.log(error);
    }
  };

  toggleShareSwitch = (): void => {
    this.setState(
      ({ currentInfo }) => ({
        currentInfo: {
          ...currentInfo,
          isActiveInvite: !(currentInfo.isActiveInvite ?? false),
        },
      }),
      this.updateClassInfo,
    );
  };
  //#endregion class code

  // #region dialog
  dismissSaveDialog = (): void => {
    this.setState({
      showDiscardPopupError: false,
    });
  };

  discardChanges = (): void => {
    const { prevInfo } = this.state;

    this.setState(
      {
        currentInfo: prevInfo,
      },
      () => {
        this.dismissSaveDialog();
        this.updateHeader();
      },
    );
  };
  // #endregion dialog

  render(): JSX.Element {
    const {
      state: {
        currentInfo: {
          section,
          title,
          description = '',
          isActiveInvite = false,
          classCode = '',
          inviteLink = '',
        },
        showDiscardPopupError,
        error: { title: titleErrorMsg, section: sectionErrorMsg },
      },
      onCodeShare,
      onDescriptionChange,
      onLinkShare,
      onSectionChange,
      onTitleChange,
      dismissSaveDialog,
      onPositiveButtonClick,
      discardChanges,
      toggleShareSwitch,
    } = this;

    return (
      <>
        <ClassSettings
          title={title}
          section={section}
          description={description}
          titleErrorMsg={titleErrorMsg}
          sectionErrorMsg={sectionErrorMsg}
          isShareOptionEnabled={isActiveInvite}
          code={classCode}
          link={inviteLink}
          onTitleChange={onTitleChange}
          onSectionChange={onSectionChange}
          onDescriptionChange={onDescriptionChange}
          toggleShareSwitch={toggleShareSwitch}
          onCodeShare={onCodeShare}
          onLinkShare={onLinkShare}
        />
        <DoubleButtonPopup
          onDismiss={dismissSaveDialog}
          visible={showDiscardPopupError}
          negativeButtonText="Discard"
          onPositiveButtonClick={onPositiveButtonClick}
          onNegativeButtonClick={discardChanges}
          positiveButtonText="Save"
          title="Discard Changes ?"
          text="You have some unsaved changes."
        />
      </>
    );
  }
}

// #region functional
/* 
const ClassSettingsPage: React.FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const [prevTitle, setPrevTitle] = useState('');
  const [prevSection, setPrevSection] = useState('');
  const [prevDescription, setPrevDescription] = useState('');
  const [currentTitle, setCurrentTitle] = useState(prevTitle);
  const [currentSection, setCurrentSection] = useState(prevSection);
  const [currentDescription, setCurrentDescription] = useState(prevDescription);
  const [titleErrorMsg, setTitleErrorMsg] = useState('');
  const [sectionErrorMsg, setSectionErrorMsg] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isActiveInvite, setIsActiveInvite] = useState(false);

  const {
    params: { classId },
  } = route;

  const fetchUpdateClassInfo = useCallback(async () => {
    // TODO: add a loader when loading fetching the data

    const [info] = await teacherApi.getClassInfo(classId);

    if (info !== null) {
      setCurrentTitle(info.title);
      setCurrentSection(info.section);
      setCurrentDescription(info.description);
      setPrevDescription(info.description);
      setPrevSection(info.section);
      setPrevTitle(info.title);
      setIsActiveInvite(info.isActiveInvite);
    }
  }, [classId]);

  useEffect(() => {
    fetchUpdateClassInfo();
  }, [fetchUpdateClassInfo]);

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

  const updateClassInfo = useCallback(async () => {
    // TODO: add a loader when updating the class info
    const classInfo = TeacherClassModel.Update({
      title: currentTitle,
      section: currentSection,
      description: currentDescription,
    });

    // TODO: handle error case
    await teacherApi.updateClass(classId, classInfo);
    await fetchUpdateClassInfo();
  }, [
    currentTitle,
    currentSection,
    currentDescription,
    classId,
    fetchUpdateClassInfo,
  ]);

  // #region events
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

  const onCodeShare = () => {
    try {
      // TODO: create a message to explain the action
      Share.share({ message: classId, title: 'Class Code' });
    } catch (error) {
      //   console.log(error);
    }
  };

  const onLinkShare = () => {
    try {
      // TODO: generate valid link
      Share.share({
        message: 'https://attenda.app.to/A454SDS',
        url: 'https://attenda.app.to/A454SDS',
        title: 'Class Code Link',
      });
    } catch (error) {
      //   console.log(error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <View style={{ display: hasUnsavedChanges() ? 'flex' : 'none' }}>
          <IconButton
            color={tintColor ?? lightColor}
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

  // #endregion events

  /**
   * show error message if the class title/section is empty
   * @param param \{ title = undefined, section = undefined}
   /
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
        isShareOptionEnabled={isActiveInvite}
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
*/
// #endregion

export default ClassSettingsPage;

import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
// NOTICE: maybe remove use some other method because Clipboard from react-native is deprecated and will be remove soon
import { Share, View, Clipboard } from 'react-native';
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
import ChangeClassCode, {
  InfoTextType,
} from '../../components/organisms/Teacher/ChangeClassCode';
import GlobalContext from '../../context/GlobalContext';
import { RealTimeListenerUnSubscriber } from '../../api/BaseApi';

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
  currClassCode: string;
  classCodeErrorMessage: string;
  classCodeErrorType: InfoTextType;
  showClassCodeEditDialog: boolean;
  showSpinner: boolean;
}

class ClassSettingsPage extends React.PureComponent<Props, State> {
  // validate = throttle(async (classCode: string) => {
  //   this.setState({ showSpinner: true });
  //   const [success, error] = await teacherApi.checkIsValidClassCode(classCode);

  //   console.log(success, error, classCode);

  //   this.setState({ showSpinner: false });
  // }, 1000);

  // eslint-disable-next-line react/static-property-placement
  context!: React.ContextType<typeof GlobalContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      showDiscardPopupError: false,
      error: { section: '', title: '' },
      currentInfo: {
        section: '',
        teacherId: '',
        title: '',
        description: '',
        classCode: '',
        classId: '',
        currentSessionId: '',
        teacherName: null,
      },
      prevInfo: {
        section: '',
        teacherId: '',
        title: '',
        description: '',
        classCode: '',
        classId: '',
        currentSessionId: '',
        teacherName: null,
      },
      currClassCode: '',
      classCodeErrorMessage: '',
      classCodeErrorType: InfoTextType.ERROR,
      showClassCodeEditDialog: false,
      showSpinner: false,
    };
  }

  // #region lifecycle
  async componentDidMount(): Promise<void> {
    const { navigation } = this.props;

    this.removeUpdateClassInfoListener = await this.attachUpdateClassInfo();

    // BUG: for some reason react-navigation is not showing the correct return type
    // expected () => removeListener(type, callback); but got () => void
    // so we are using remove listener method to clean up the event listener
    navigation.addListener('beforeRemove', this.callback);
  }

  componentWillUnmount(): void {
    const { navigation } = this.props;

    navigation.removeListener('beforeRemove', this.callback);

    this.removeUpdateClassInfoListener();
  }

  callback = (e: NavigationEventListenerCallback): void => {
    if (this.hasUnsavedChanges()) {
      this.setState({ showDiscardPopupError: true });
      // prevent from going back
      e.preventDefault();
    }
  };

  removeUpdateClassInfoListener = (): void => {
    console.log('never was attached');
  };

  getClassId = (): string => {
    const {
      route: {
        params: { classId },
      },
    } = this.props;

    return classId;
  };

  getClassCode = (): string => {
    const {
      currentInfo: { classCode },
    } = this.state;

    return classCode ?? '';
  };
  //#endregion lifecycle

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
    this.updateHeader();
  };

  attachUpdateClassInfo = (): RealTimeListenerUnSubscriber => {
    const {
      route: {
        params: { classId },
      },
    } = this.props;

    return teacherApi.getClassInfoRealTime(classId, classInfo => {
      if (classInfo !== null)
        this.setState({
          currentInfo: classInfo.toJson(),
          prevInfo: classInfo.toJson(),
          currClassCode: classInfo.classCode,
        });
    });
  };

  validateClassCode = async (classCode: string): Promise<void> => {
    if (classCode.length < 3) {
      this.setState({
        classCodeErrorMessage: `Invite Code must be getter than 3 character`,
        classCodeErrorType: InfoTextType.ERROR,
      });

      return;
    }
    this.setState({ showSpinner: true });
    const [success, error] = await teacherApi.checkIsValidInviteCode(classCode); // TODO: handle error

    if (success === false)
      this.setState({
        classCodeErrorMessage: `Invite Code '${classCode}' is not available`,
        classCodeErrorType: InfoTextType.ERROR,
      });
    if (success === true)
      this.setState({
        classCodeErrorMessage: `Invite Code '${classCode}' is available`,
        classCodeErrorType: InfoTextType.SUCCESS,
      });

    this.setState({ showSpinner: false });
  };

  onSaveClassCode = async (): Promise<void> => {
    const {
      props: {
        route: {
          params: { classId },
        },
      },
      state: { currClassCode },
      context,
    } = this;

    context.changeSpinnerLoading(true);
    await teacherApi.updateClassCode(classId, currClassCode);
    await this.updateClassInfo();
    context.changeSpinnerLoading(false);

    this.setState({ showClassCodeEditDialog: false });
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

  onClassCodeChange = async (newCode: string): Promise<void> => {
    this.setState({ currClassCode: newCode });
    // await wait(500);
    this.validateClassCode(newCode);
  };

  // #endregion change handler

  // #region Invite code
  onCodeShare = async (): Promise<void> => {
    const classId = this.getClassCode();

    try {
      // TODO: create a message to explain the action
      await Share.share({ message: classId, title: 'Invite Code' });
    } catch (error) {
      console.log(Clipboard);
      Clipboard.setString(classId);
    }
  };

  onLinkShare = async (): Promise<void> => {
    const url = 'https://attenda.app.to/A454SDS';

    try {
      // TODO: generate valid link
      await Share.share({
        message: 'https://attenda.app.to/A454SDS',
        url,
        title: 'Invite Code Link',
      });
    } catch (error) {
      //   console.log(error);
      Clipboard.setString(url);
    }
  };

  toggleShareSwitch = async (): Promise<void> => {
    const {
      state: {
        currentInfo: { isActiveInvite = false },
      },
      props: {
        route: {
          params: { classId },
        },
      },
      context,
    } = this;

    context.changeSpinnerLoading(true);
    await teacherApi.changeInviteCodeEnableStatus(classId, !isActiveInvite);
    // await this.updateClassInfo();
    context.changeSpinnerLoading(false);
  };
  //#endregion Invite code

  // #region dialog
  dismissSaveDialog = (): void => {
    this.setState({
      showDiscardPopupError: false,
    });
  };

  discardChanges = (): void => {
    const {
      props: { navigation },
      state: { prevInfo },
    } = this;

    this.setState(
      {
        currentInfo: prevInfo,
      },
      () => {
        this.dismissSaveDialog();
        this.updateHeader();
        navigation.goBack();
      },
    );
  };

  onEditClassCodeClick = (): void => {
    this.setState({ showClassCodeEditDialog: true });
  };
  // #endregion dialog

  render(): JSX.Element {
    const {
      state: {
        showDiscardPopupError,
        error: { title: titleErrorMsg, section: sectionErrorMsg },
        currentInfo: {
          section,
          title,
          description = '',
          isActiveInvite = false,
          classCode = '',
          inviteLink = '',
        },
        currClassCode,
        classCodeErrorMessage,
        classCodeErrorType,
        showClassCodeEditDialog,
        showSpinner,
      },
      onCodeShare,
      onDescriptionChange,
      onLinkShare,
      onSectionChange,
      onTitleChange,
      dismissSaveDialog,
      discardChanges,
      toggleShareSwitch,
      onEditClassCodeClick,
      onClassCodeChange,
      onSaveClassCode,
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
          onEditClassCodeClick={onEditClassCodeClick}
        />
        <DoubleButtonPopup
          onDismiss={dismissSaveDialog}
          visible={showDiscardPopupError}
          negativeButtonText="Cancel"
          positiveButtonText="Discard"
          onPositiveButtonClick={discardChanges}
          onNegativeButtonClick={dismissSaveDialog}
          title="Discard Changes ?"
          text="You have some unsaved changes."
        />

        <ChangeClassCode
          infoText={classCodeErrorMessage}
          infoType={classCodeErrorType}
          initialClassCode={currClassCode}
          showSpinner={showSpinner}
          showDialog={showClassCodeEditDialog}
          onClassCodeChange={onClassCodeChange}
          onDismissDialog={() =>
            this.setState({ showClassCodeEditDialog: false })
          }
          onSaveClassCode={onSaveClassCode}
        />
      </>
    );
  }
}

ClassSettingsPage.contextType = GlobalContext;

export default ClassSettingsPage;

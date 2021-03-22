import React from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert, ImageSourcePropType, Platform } from 'react-native';
import { RootStackParamList } from '../../App';
import MyAccount from '../../components/organisms/Common/MyAccount';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import AuthApi, { authApi } from '../../api/AuthApi';
import SingleButtonPopup from '../../components/molecules/SingleButtonPopup';
import GlobalContext from '../../context/GlobalContext';
import AccountInfo from '../../api/model/AccountInfo';
import { NavigationEventListenerCallback } from '../../util/hooks/useConfirmBack';
import DoubleButtonPopup from '../../components/molecules/DoubleButtonPopup';

type Props = StackScreenProps<RootStackParamList, 'MyAccount'>;

export const MyAccountNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'My Account',
};

interface State {
  info: AccountInfo | null;
  profileImage: ImageSourcePropType | null;
  currName: string;
  nameError: string;
  showPopup: boolean;
  showLogoutError: boolean;
  showUnsavedDiscardPopup: boolean;
  showLogoutPopup: boolean;
}

class MyAccountPage extends React.Component<Props, State> {
  // eslint-disable-next-line react/static-property-placement
  context!: React.ContextType<typeof GlobalContext>;

  constructor(prop: Props) {
    super(prop);

    this.state = {
      info: null,
      profileImage: null,
      currName: '',
      nameError: '',
      showLogoutError: false,
      showPopup: false,
      showUnsavedDiscardPopup: false,
      showLogoutPopup: false,
    };
  }

  async componentDidMount(): Promise<void> {
    const { navigation } = this.props;

    await this.loadInfo();
    navigation.addListener('beforeRemove', this.callback);
  }

  componentWillUnmount(): void {
    const { navigation } = this.props;

    navigation.removeListener('beforeRemove', this.callback);
  }

  callback = (e: NavigationEventListenerCallback): void => {
    const { info, currName } = this.state;

    console.log(`${info?.name} !== ${currName}`);

    if (info?.name !== currName) {
      // prevent from going back
      e.preventDefault();
      this.setState({ showUnsavedDiscardPopup: true });
    }
  };

  askImageRollPermission = async (): Promise<void> => {
    if (Platform.OS !== 'web') {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Sorry, we need camera roll permissions to make this work!',
        );
      }
    }
  };

  uploadImage = async (uri: string): Promise<void> => {
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create a Storage Ref w/ username
    const storageRef = AuthApi.getProfilePicRef();

    storageRef.put(blob);
  };

  setProfilePic = (uri: string): void => {
    const {
      state: { info },
      context,
    } = this;

    context.changeProfilePic({ uri });

    if (info) info.profilePicUrl = uri;
    this.setState((prevState: State) => ({
      ...prevState,
    }));
  };

  onEditProfilePictureClick = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const image = await ImageManipulator.manipulateAsync(result.uri, [
        {
          resize: {
            height: 600,
            width: 600,
          },
        },
      ]);

      const imageUri = image.uri;

      this.setProfilePic(imageUri);
      // Upload file
      // TODO: show a progress
      await this.uploadImage(image.uri);
    }
  };

  loadInfo = async (): Promise<void> => {
    const { context } = this;

    context.changeSpinnerLoading(true);

    const [info] = await authApi.getAccountInfo();

    context.changeSpinnerLoading(false);

    if (info != null) {
      this.setState({ info, currName: info.name, showPopup: false });
    } else {
      this.setState({ showPopup: true });
    }

    try {
      const url = await AuthApi.getProfilePicRef().getDownloadURL();

      this.setProfilePic(url);
    } catch (e) {
      console.log('Image access error', e);
    }
  };

  onLogOut = async (): Promise<void> => {
    // start the loading spinner this will unloading of the spinner will be happen by the onAuthStateChangeListener
    const { context } = this;

    context.changeSpinnerLoading(true);
    await authApi.logOut();
  };

  revalidateError = (_name: string): boolean => {
    if (_name.length < 3) {
      this.setState({ nameError: 'Name must contain at least 3 letters.' });

      return false;
    }
    this.setState({ nameError: '' });

    return true;
  };

  onNameChange = async (newName: string): Promise<boolean> => {
    const { context } = this;

    if (this.revalidateError(newName)) {
      context.changeSpinnerLoading(true);
      // TODO: Do something with the error
      // BUG: if there is no internet connection the promise doesn't resolve
      const [success] = await authApi.updateName(newName);

      await this.loadInfo();

      context.changeSpinnerLoading(false);

      return success === true;
    }

    return false;
  };

  onNameType = (currName: string): void => {
    this.setState({ currName });
  };

  render(): JSX.Element {
    const {
      loadInfo,
      onLogOut,
      onNameChange,
      onNameType,
      revalidateError,
      onEditProfilePictureClick,
      props: { navigation },
      state: {
        info,
        showPopup,
        nameError,
        showUnsavedDiscardPopup,
        showLogoutError,
        showLogoutPopup,
      },
    } = this;

    return (
      <>
        <MyAccount
          profilePicUrl={info?.profilePicUrl ?? undefined}
          onNameType={onNameType}
          errors={{ nameError }}
          name={info?.name ?? ''}
          email={info?.email ?? ''}
          userRole={info?.role ?? ''}
          onNameChange={onNameChange}
          revalidateError={revalidateError}
          onChangePasswordClick={() => navigation.push('ChangePassword')}
          // QUESTION: should reset the stack ?
          showPopup={showLogoutError}
          onDismissPopup={() => this.setState({ showLogoutError: false })}
          onPositivePopupClick={() => {
            navigation.navigate('SignIn');
          }}
          onLogOutClick={() => this.setState({ showLogoutPopup: true })}
          onEditProfilePictureClick={onEditProfilePictureClick}
        />
        <SingleButtonPopup
          visible={showPopup}
          title="Error"
          text="Something went wrong. Please refresh the page."
          buttonText="Retry"
          onDismiss={() => this.setState({ showPopup: false })}
          onButtonClick={loadInfo}
        />

        <DoubleButtonPopup
          visible={showUnsavedDiscardPopup}
          title="Discard Changes?"
          text="You have some unsaved changes."
          negativeButtonText="Cancel"
          positiveButtonText="Discard"
          onDismiss={() => this.setState({ showUnsavedDiscardPopup: false })}
          onNegativeButtonClick={() =>
            this.setState({ showUnsavedDiscardPopup: false })
          }
          onPositiveButtonClick={async () => {
            this.setState(
              {
                showUnsavedDiscardPopup: false,
                currName: info?.name ?? '',
              },
              () => navigation.goBack(),
            );
          }}
        />

        <DoubleButtonPopup
          visible={showLogoutPopup}
          title="Logout?"
          text="Are you sure do you want to logout?"
          negativeButtonText="Cancel"
          positiveButtonText="Logout"
          onDismiss={() => this.setState({ showLogoutPopup: false })}
          onNegativeButtonClick={() =>
            this.setState({ showLogoutPopup: false })
          }
          onPositiveButtonClick={async () => {
            await onLogOut();
            this.setState({
              showLogoutPopup: false,
            });
          }}
        />
      </>
    );
  }
}
MyAccountPage.contextType = GlobalContext;

export default MyAccountPage;

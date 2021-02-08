import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import MyAccount from '../../components/organisms/Common/MyAccount';
import { SimpleHeaderBackNavigationOptions } from '../../components/templates/SimpleHeaderNavigationOptions';
import { authApi } from '../../api/AuthApi';
import SingleButtonPopup from '../../components/molecules/SingleButtonPopup';
import GlobalContext from '../../context/GlobalContext';
import AccountInfo from '../../api/model/AccountInfo';

type Props = StackScreenProps<RootStackParamList, 'MyAccount'>;

export const MyAccountNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'My Account',
};

const MyAccountPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  // our component doesn't need no know about the global spinner so we are using the ref to update the info
  const [showPopup, setShowPopup] = useState(false);
  const [nameError, setNameError] = useState('');
  const [info, setInfo] = useState<AccountInfo | null>(null);
  const [showLogOutPopup, setShowLogOutPopup] = useState(false);
  const globalContext = useRef(useContext(GlobalContext));

  const loadInfo = useCallback(async () => {
    if (info !== null) return;
    globalContext.current.changeSpinnerLoading(true);

    const [_info] = await authApi.getAccountInfo();

    globalContext.current.changeSpinnerLoading(false);

    if (_info != null) {
      setInfo(_info);
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  }, [info]);

  useEffect(() => {
    loadInfo();
  }, [loadInfo]);

  const onLogOut = async () => {
    // start the loading spinner this will unloading of the spinner will be happen by the onAuthStateChangeListener
    globalContext.current.changeSpinnerLoading(true);
    await authApi.logOut();
  };

  const revalidateError = (_name: string): boolean => {
    if (_name.length < 3) {
      setNameError('Name must be getter than 3 character long');

      return false;
    }
    setNameError('');

    return true;
  };

  const onNameChange = async (newName: string): Promise<boolean> => {
    if (revalidateError(newName)) {
      const accInfo = new AccountInfo({
        name: newName,
      });

      globalContext.current.changeSpinnerLoading(true);
      // TODO: Do something with the error
      // BUG: if there is no internet connection the promise doesn't resolve
      const [success, _error] = await authApi.updateAccountInfo(accInfo);

      globalContext.current.changeSpinnerLoading(false);

      return success === true;
    }

    return false;
  };

  return (
    <>
      <MyAccount
        errors={{ nameError }}
        name={info?.name ?? ''}
        email={info?.email ?? ''}
        userRole={info?.role ?? ''}
        onNameChange={onNameChange}
        revalidateError={revalidateError}
        onChangePasswordClick={() => navigation.push('ChangePassword')}
        // QUESTION: should reset the stack ?
        showPopup={showLogOutPopup}
        onDismissPopup={() => setShowLogOutPopup(false)}
        onPositivePopupClick={() => {
          navigation.navigate('SignIn');
        }}
        // onLogOutClick={() => navigation.navigate('SignIn')}
        onLogOutClick={onLogOut}
        onEditProfilePictureClick={() => null}
      />
      <SingleButtonPopup
        visible={showPopup}
        title="Ooops..."
        text="Something went wrong. Please refresh the page."
        buttonText="Retry"
        onDismiss={() => setShowPopup(false)}
        onButtonClick={loadInfo}
      />
    </>
  );
};

export default MyAccountPage;

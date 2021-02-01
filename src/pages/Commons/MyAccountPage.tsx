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
  const globalContext = useRef(useContext(GlobalContext));
  const [showLogOutPopup, setShowLogOutPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [info, setInfo] = useState<AccountInfo | null>(null);

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

  return (
    <>
      <MyAccount
        username={info?.name ?? ''}
        email={info?.email ?? ''}
        userRole={info?.role ?? ''}
        onEditUsernameClick={() => null}
        onChangePasswordClick={() => navigation.push('ChangePassword')}
        // QUESTION: should reset the stack ?
        showPopup={showLogOutPopup}
        onDismissPopup={() => setShowLogOutPopup(false)}
        onPositivePopupClick={() => {
          navigation.navigate('SignIn');
        }}
        // onLogOutClick={() => navigation.navigate('SignIn')}
        onLogOutClick={async () => {
          await authApi.logOut();
        }}
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

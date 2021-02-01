import React, { useCallback, useContext, useEffect, useState } from 'react';
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

type Props = StackScreenProps<RootStackParamList, 'MyAccount'>;

export const MyAccountNavigationOptions: StackNavigationOptions = {
  ...SimpleHeaderBackNavigationOptions,
  title: 'My Account',
};

const MyAccountPage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const globalContext = useContext(GlobalContext);
  const [showLogOutPopup, setShowLogOutPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const loadInfo = useCallback(async () => {
    console.log(`${username} ${role} ${email}`);
    if (role !== '') return;
    globalContext.changeSpinnerLoading(true);
    const [info] = await authApi.getAccountInfo();

    globalContext.changeSpinnerLoading(false);

    if (info != null) {
      setUsername(info.name);
      setEmail(info.email);
      setRole(info.role);
    } else {
      setShowPopup(true);
    }
  }, [email, globalContext, role, username]);

  useEffect(() => {
    loadInfo();
  }, [loadInfo]);

  return (
    <>
      <MyAccount
        username={username}
        email={email}
        userRole={role}
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

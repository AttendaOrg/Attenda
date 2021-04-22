import React, { useContext, useState } from 'react';
import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import ChooseRole, { Role } from '../components/organisms/AppIntro/ChooseRole';
import SimpleCloseNavigationOptions from '../components/templates/SimpleCloseNavigationOption';
import { authApi } from '../api/AuthApi';
import { UserRole } from '../api';
import GlobalContext from '../context/GlobalContext';
import SingleButtonPopup from '../components/molecules/SingleButtonPopup';

type Props = StackScreenProps<RootStackParamList, 'ChooseRole'>;

export const ChooseRoleNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;
// HEADER_AB_TEST_NEW
//   ? { ...SimpleHeaderBackNavigationOptions, title: 'Choose Role' }
//   : SimpleCloseNavigationOptions;

const ChooseRolePage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const globalContext = useContext(GlobalContext);
  const [msg, setMsg] = useState('');

  const handleOnDone = async (role: Role) => {
    if (await globalContext.throwNetworkError()) return;

    globalContext.changeSpinnerLoading(true);
    switch (role) {
      case Role.Student: {
        // resetting the navigation stack for performance reason
        // this will cause the app to forgot previous items in stack
        // for this if the use click back from next screen it will cause the app to exit
        const [success, error] = await authApi.setUserRole(UserRole.STUDENT);

        if (error !== null) {
          setMsg('Some error Ocurred');
        }

        if (success === true) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'StudentClassList' }],
            }),
          );
        }
        break;
      }
      case Role.Teacher: {
        // resetting the navigation stack for performance reason
        // this will cause the app to forgot previous items in stack
        // for this if the use click back from next screen it will cause the app to exit
        const [success, error] = await authApi.setUserRole(UserRole.TEACHER);

        if (error !== null) {
          setMsg('Some error Ocurred');
        }

        if (success === true) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'TeacherClassList' }],
            }),
          );
        }
        break;
      }
      default: {
        setMsg('Some error Ocurred');
        break;
      }
    }
    globalContext.changeSpinnerLoading(false);
  };

  const dismissPopup = () => {
    setMsg('');
  };

  return (
    <>
      <ChooseRole onDone={handleOnDone} />
      <SingleButtonPopup
        title="Error"
        text={msg}
        buttonText="Ok"
        onButtonClick={dismissPopup}
        onDismiss={dismissPopup}
        visible={msg !== ''}
      />
    </>
  );
};

export default ChooseRolePage;

import React, { useContext } from 'react';
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
import { convertErrorToMsg } from '../api/BaseApi';
import GlobalContext from '../context/GlobalContext';

type Props = StackScreenProps<RootStackParamList, 'ChooseRole'>;

export const ChooseRoleNavigationOptions: StackNavigationOptions = SimpleCloseNavigationOptions;
// HEADER_AB_TEST_NEW
//   ? { ...SimpleHeaderBackNavigationOptions, title: 'Choose Role' }
//   : SimpleCloseNavigationOptions;

const ChooseRolePage: React.FC<Props> = ({ navigation }): JSX.Element => {
  const globalContext = useContext(GlobalContext);

  const handleOnDone = async (role: Role) => {
    globalContext.changeSpinnerLoading(true);
    switch (role) {
      case Role.Student: {
        // resetting the navigation stack for performance reason
        // this will cause the app to forgot previous items in stack
        // for this if the use click back from next screen it will cause the app to exit
        // TODO: add an error handler
        const [success, error] = await authApi.setUserRole(UserRole.STUDENT);

        console.log(success, convertErrorToMsg(error));

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
      default: {
        // resetting the navigation stack for performance reason
        // this will cause the app to forgot previous items in stack
        // for this if the use click back from next screen it will cause the app to exit
        // TODO: add an error handler
        const [success, error] = await authApi.setUserRole(UserRole.TEACHER);

        console.log(success, convertErrorToMsg(error));
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
    }
    globalContext.changeSpinnerLoading(false);
  };

  return <ChooseRole onDone={handleOnDone} />;
};

export default ChooseRolePage;

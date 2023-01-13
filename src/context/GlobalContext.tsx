import React, { useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { useNetworkError } from '../util/hooks/useNetworkError';
import { isConnectedToInternet } from '../util/util';

export interface IGlobalContext {
  isSpinnerLoading: boolean;
  profilePic: ImageSourcePropType;
}

export type GlobalContextType = {
  settings: IGlobalContext;
  changeSpinnerLoading: (loading: boolean) => void;
  changeProfilePic: (profilePic?: ImageSourcePropType) => void;
  throwNetworkError: () => Promise<boolean>;
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultProfilePic = require('../../assets/images/user.jpg');

const defaultGlobalSettings: GlobalContextType = {
  settings: {
    isSpinnerLoading: false,
    profilePic: defaultProfilePic,
  },
  changeSpinnerLoading: () => {
    throw new Error('method not implemented');
  },
  changeProfilePic: () => {
    throw new Error('method not implemented');
  },
  throwNetworkError: () => {
    throw new Error('method not implemented');
  },
};

const GlobalContext = React.createContext<GlobalContextType>(
  defaultGlobalSettings,
);

export const GlobalContextProvider: React.FC = ({ children }) => {
  const [showNetworkError, NetworkErrorElm] = useNetworkError();
  const [settings, setSettings] = useState<IGlobalContext>({
    isSpinnerLoading: false,
    profilePic: defaultGlobalSettings.settings.profilePic,
  });

  const changeSpinnerLoading = (loading: boolean) => {
    // console.log(`called -> changeSpinnerLoading( ${loading} )`);
    setSettings({
      isSpinnerLoading: loading,
      profilePic: settings.profilePic,
    });
  };

  const changeProfilePic = (profilePic?: ImageSourcePropType) => {
    // console.log(`called -> changeSpinnerLoading( ${loading} )`);
    setSettings({
      isSpinnerLoading: settings.isSpinnerLoading,
      profilePic: profilePic ?? defaultProfilePic,
    });
  };

  const throwNetworkError = async (): Promise<boolean> => {
    if (await isConnectedToInternet()) return false;

    showNetworkError();

    return true;
  };

  return (
    <GlobalContext.Provider
      value={{
        settings,
        changeSpinnerLoading,
        changeProfilePic,
        throwNetworkError,
      }}
    >
      {children}
      {NetworkErrorElm}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;

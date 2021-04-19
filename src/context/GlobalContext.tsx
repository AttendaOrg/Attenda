import React, { useState } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface IGlobalContext {
  isSpinnerLoading: boolean;
  profilePic: ImageSourcePropType;
}

export type GlobalContextType = {
  settings: IGlobalContext;
  changeSpinnerLoading: (loading: boolean) => void;
  changeProfilePic: (profilePic?: ImageSourcePropType) => void;
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
};

const GlobalContext = React.createContext<GlobalContextType>(
  defaultGlobalSettings,
);

export const GlobalContextProvider: React.FC = ({ children }) => {
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

  return (
    <GlobalContext.Provider
      value={{ settings, changeSpinnerLoading, changeProfilePic }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;

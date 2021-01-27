import React, { useState } from 'react';

export interface IGlobalContext {
  isSpinnerLoading: boolean;
}

export type GlobalContextType = {
  settings: IGlobalContext;
  changeSpinnerLoading: (loading: boolean) => void;
};

const defaultGlobalSettings: GlobalContextType = {
  settings: { isSpinnerLoading: false },
  changeSpinnerLoading: () => {
    throw new Error('method not implemented');
  },
};

const GlobalContext = React.createContext<GlobalContextType>(
  defaultGlobalSettings,
);

export const GlobalContextProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState<IGlobalContext>({
    isSpinnerLoading: false,
  });

  const changeSpinnerLoading = (loading: boolean) => {
    // console.log(`called -> changeSpinnerLoading( ${loading} )`);
    setSettings({
      isSpinnerLoading: loading,
    });
  };

  return (
    <GlobalContext.Provider value={{ settings, changeSpinnerLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;

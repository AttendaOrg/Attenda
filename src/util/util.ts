import NetInfo from '@react-native-community/netinfo';

export const isConnectedToInternet = async (): Promise<boolean> =>
  (await NetInfo.fetch()).isConnected ?? false;

export default {
  isConnectedToInternet,
};

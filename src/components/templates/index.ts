import { Dimensions } from 'react-native';

export default {};

export const isSmallDevice = (): boolean =>
  Dimensions.get('screen').height <= 700;

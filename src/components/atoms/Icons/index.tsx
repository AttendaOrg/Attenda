import { StyleProp, ViewStyle } from 'react-native';
import Google from './Google';
import Twitter from './Twitter';
import Facebook from './Facebook';

export interface IconsPops {
  height?: number;
  width?: number;
  style?: StyleProp<ViewStyle>;
}

export { Google, Twitter, Facebook };

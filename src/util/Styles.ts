import { LayoutAnimation, LayoutAnimationConfig } from 'react-native';

export const CustomLayoutLinearConfig: LayoutAnimationConfig = {
  duration: 100,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.linear,
  },
};

// styes.inputContainerStyle does returns number not object thats why for web its gives warning
// because react-native-element expect array or object as prop type
export const inputContainerStyle = { paddingHorizontal: 0, minHeight: 24 };

export default {};

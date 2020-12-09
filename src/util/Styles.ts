import { LayoutAnimation } from 'react-native';

export const CustomLayoutLinearConfig = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.linear,
  },
};

export default {
  CustomLayoutLinearAnimation: CustomLayoutLinearConfig,
};

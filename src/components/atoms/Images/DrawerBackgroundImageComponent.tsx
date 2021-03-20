import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconsPops } from '../Icons';

const DrawerBackgroundImageComponent: React.FC<IconsPops> = ({
  height = 180,
  width = '100%',
  style = {},
}): JSX.Element => {
  return (
    <Svg
      style={style}
      height={height}
      width={width}
      preserveAspectRatio="none"
      viewBox="0 0 930 492"
    >
      <Path
        d="M192.5 490.3c-33.4-.8-78.8-4.3-115-8.9-18.5-2.3-61.7-9.2-72.8-11.6l-4.7-1V0h930v234c0 216.5-.1 234-1.6 234-1 0-7.4-2.9-14.3-6.4-53.7-27.2-107.5-38.9-172.1-37.3-47.4 1.2-86.9 6.8-188 26.6-71 14-91.9 17.8-129 23.5-82.6 12.8-156.6 17.8-232.5 15.9z"
        fill="#00acee"
      />
      <Path
        d="M0 478.6v-13.4l4.3 1c9.8 2.2 57.7 9.9 76.2 12.2 113 14.2 218.4 12 341.5-7 37.1-5.7 58-9.5 129-23.5 72.3-14.2 113-20.9 148-24.4 21.8-2.2 67-3.1 85.5-1.6 48.8 3.9 90.8 15.5 132.8 36.8l12.7 6.4V492H0v-13.4z"
        fill="#fff"
      />
    </Svg>
  );
};

export default DrawerBackgroundImageComponent;

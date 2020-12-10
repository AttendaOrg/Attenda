import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconsPops } from '.';

const Arrow: React.FC<IconsPops> = ({
  height = 50,
  width = 50,
}): JSX.Element => (
  <Svg height={height} width={width} viewBox="0 0 57 47">
    <Path
      d="M54.5 42C32.5 40.5 11.5 30 1 1M54.5 42C49.3333 40.5 39.2 33.1 38 27.5M54.5 42C49.3333 44 37.3 47.6 30.5 46"
      stroke="#161616"
    />
  </Svg>
);

export default Arrow;

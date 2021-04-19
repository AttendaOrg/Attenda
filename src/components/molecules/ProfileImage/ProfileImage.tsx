import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Shimmer from '../../atoms/Shimmer/Shimmer';

export interface ProfileImagePops {
  avatar?: ImageSourcePropType;
  height?: number;
  style?: StyleProp<ImageStyle>;
  blurRadius?: number;
}

const ProfileImage: React.FC<ProfileImagePops> = ({
  avatar,
  height = 34,
  style,
  blurRadius = 0,
}): JSX.Element => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  console.log(avatar);

  const isInvalidPic =
    avatar === undefined ||
    avatar === null ||
    avatar === '' ||
    (avatar as any).uri === undefined ||
    (avatar as any).uri === null ||
    (avatar as any).uri === '';

  if (isInvalidPic)
    return (
      <MaterialIcons
        name="account-circle"
        size={height}
        color="#afafaf"
        style={style}
      />
    );

  return (
    <>
      {isImageLoading && (
        <Shimmer style={{ borderRadius: 100 }} height={height} width={height} />
      )}

      <Image
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(blurRadius !== 0 && { blurRadius })}
        onLoadStart={() => {
          console.log('onLoadStart');
        }}
        onLoadEnd={() => {
          console.log('onLoadEnd');
          setIsImageLoading(false);
        }}
        style={[
          {
            borderRadius: 100,
            height,
            width: height,
          },
          style,
          { display: isImageLoading ? 'none' : 'flex' },
        ]}
        source={avatar as ImageSourcePropType}
      />
    </>
  );
};

export default React.memo(ProfileImage);

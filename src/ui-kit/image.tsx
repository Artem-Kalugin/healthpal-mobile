import React from 'react';

import { Image as ExpoImage } from 'expo-image';

type ExpoImageProps = ExpoImage['props'];

type ApiImage = {
  image: string;
  thumbhash: string;
};

type ImageWithSourceFromApi = {
  forceSourceFromApi: true;
  source: ApiImage;
};

type ImageWithUnknownSource = {
  forceSourceFromApi?: boolean;
  source: ApiImage | ExpoImageProps['source'];
};

type ImageWithPossibleApiSource = (
  | ImageWithSourceFromApi
  | ImageWithUnknownSource
) &
  ExpoImageProps;

export const Image: React.FC<ImageWithPossibleApiSource> = ({
  source,
  placeholder,
  forceSourceFromApi,
  ...props
}) => {
  const isApiImage =
    forceSourceFromApi !== undefined
      ? forceSourceFromApi
      : source && typeof source === 'object' && 'thumbhash' in source;

  return (
    <ExpoImage
      placeholder={
        isApiImage ? { thumbhash: (source as ApiImage).thumbhash } : placeholder
      }
      {...props}
      source={
        isApiImage
          ? `${process.env.EXPO_PUBLIC_API_URL + (source as ApiImage).image}`
          : source
      }
      transition={isApiImage ? 100 : props.transition}
    />
  );
};

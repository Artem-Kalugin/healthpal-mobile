import React, { RefObject } from 'react';

import { Image as ExpoImage } from 'expo-image';

import { useSelector } from '#store';

type ExpoImageProps = ExpoImage['props'];

type ApiImage = {
  image: string;
  thumbhash: string;
};

type ImageWithSourceFromApi = {
  source: ApiImage;
};

type ImageWithUnknownSource = {
  source: ApiImage | ExpoImageProps['source'];
};

type ImageWithPossibleApiSource = (
  | ImageWithSourceFromApi
  | ImageWithUnknownSource
) &
  ExpoImageProps & {
    imageRef?: RefObject<ExpoImage | null>;
  };

export const Image: React.FC<ImageWithPossibleApiSource> = ({
  imageRef,
  source,
  placeholder,
  ...props
}) => {
  const token = useSelector(store => store.runtime.token?.plain);
  const isApiImage =
    source && typeof source === 'object' && 'thumbhash' in source;

  return (
    <ExpoImage
      ref={imageRef}
      placeholder={
        isApiImage ? { thumbhash: (source as ApiImage).thumbhash } : placeholder
      }
      {...props}
      source={
        isApiImage
          ? {
              uri: `${process.env.EXPO_PUBLIC_API_URL + (source as ApiImage).image}`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : source
      }
      transition={isApiImage ? 250 : props.transition}
    />
  );
};

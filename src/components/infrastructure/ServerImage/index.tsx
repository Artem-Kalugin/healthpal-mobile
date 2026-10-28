import React from 'react';

import { Image } from '#ui-kit/Image';
import { ExpoImageProps, IImage } from '#ui-kit/Image/types';

import { useSelector } from '#store';

export type ApiImage = {
  image: string;
  thumbhash: string;
};

type IServerImage = Omit<IImage, 'source'> & {
  source: ApiImage | ExpoImageProps['source'];
};

export const ServerImage: React.FC<IServerImage> = ({
  source,
  placeholder,
  transition,
  ...props
}) => {
  const token = useSelector(store => store.runtime.token?.accessToken);
  const isApiImage =
    source && typeof source === 'object' && 'thumbhash' in source;

  return (
    <Image
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
      transition={isApiImage ? 250 : transition}
    />
  );
};

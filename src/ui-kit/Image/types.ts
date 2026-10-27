import { RefObject } from 'react';

import { Image as ExpoImage } from 'expo-image';

export type ExpoImageProps = ExpoImage['props'];

export type ApiImage = {
  image: string;
  thumbhash: string;
};

export type ImageWithSourceFromApi = {
  source: ApiImage;
};

export type ImageWithUnknownSource = {
  source: ApiImage | ExpoImageProps['source'];
};

export type ImageWithPossibleApiSource = (
  | ImageWithSourceFromApi
  | ImageWithUnknownSource
) &
  ExpoImageProps & {
    imageRef?: RefObject<ExpoImage | null>;
  };

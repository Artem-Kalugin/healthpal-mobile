import { RefObject } from 'react';

import { Image as ExpoImage } from 'expo-image';

export type ExpoImageProps = ExpoImage['props'];

export type IImage = ExpoImageProps & {
  imageRef?: RefObject<ExpoImage | null>;
};

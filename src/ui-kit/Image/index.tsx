import React from 'react';

import { Image as ExpoImage } from 'expo-image';

import { IImage } from './types';

export const Image: React.FC<IImage> = ({ imageRef, ...props }) => (
  <ExpoImage
    ref={imageRef}
    {...props}
  />
);

import React from 'react';

import { SvgProps } from 'react-native-svg';

// eslint-disable-next-line boundaries/element-types -- intentional ui-kit -> core import: we want to see missing-icon errors during launch, safe
import { Logger } from '#services/Logger';

import { IconFiles } from './config';

export type IconNames = keyof typeof IconFiles;

export interface IIcon extends SvgProps {
  size: number;
  name: IconNames;
}

export const Icon: React.FC<Partial<IIcon>> = ({
  name = 'check',
  size,
  ...svgProps
}) => {
  const iconReference = IconFiles[name];

  if (!iconReference) {
    Logger.error('no icon for name: ', name);
    return null;
  }

  const { component: Component, ...defaultProps } = iconReference;

  return (
    <Component
      {...(size && {
        height: size,
        width: size,
      })}
      {...defaultProps}
      {...svgProps}
    />
  );
};

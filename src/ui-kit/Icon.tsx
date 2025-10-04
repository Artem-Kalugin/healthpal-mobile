import React from 'react';

import { SvgProps } from 'react-native-svg';

import arrowLeft from '#assets/icons/arrow-left.svg';
import calendar from '#assets/icons/calendar.svg';
import camera from '#assets/icons/camera.svg';
import check from '#assets/icons/check.svg';
/* PLOP_INJECT_IMPORT */
import chevronDown from '#assets/icons/chevron-down.svg';
import chevronLeft from '#assets/icons/chevron-left.svg';
import cross from '#assets/icons/cross.svg';
import gallery from '#assets/icons/gallery.svg';
import lock from '#assets/icons/lock.svg';
import logo from '#assets/icons/logo.svg';
import messageEdit from '#assets/icons/message-edit.svg';
import sms from '#assets/icons/sms.svg';
import user from '#assets/icons/user.svg';

import { colors } from '#config';

import Debug from '#utils/debug';

const IconFiles = {
  /* PLOP_INJECT_KEY */
  chevronDown: { component: chevronDown },
  calendar: { component: calendar },
  gallery: { component: gallery },
  camera: { component: camera },
  cross: { component: cross },
  messageEdit: { component: messageEdit },
  arrowLeft: { component: arrowLeft },
  user: { component: user },
  lock: { component: lock },
  sms: { component: sms },
  logo: { component: logo },
  chevronLeft: { component: chevronLeft, fill: colors.black },
  check: { component: check, fill: colors.black },
};

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
    Debug.error('no icon for name: ', name);
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

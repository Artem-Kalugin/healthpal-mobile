import React from 'react';

import { SvgProps } from 'react-native-svg';

import appointmentsActive from '#assets/icons/appointments-active.svg';
import appointments from '#assets/icons/appointments.svg';
import arrowLeft from '#assets/icons/arrow-left.svg';
import arrowRight from '#assets/icons/arrow-right.svg';
import calendarEdit from '#assets/icons/calendar-edit.svg';
import calendarRemove from '#assets/icons/calendar-remove.svg';
import calendarTick from '#assets/icons/calendar-tick.svg';
import calendar from '#assets/icons/calendar.svg';
import call from '#assets/icons/call.svg';
import camera from '#assets/icons/camera.svg';
import check from '#assets/icons/check.svg';
import chevronDown from '#assets/icons/chevron-down.svg';
import chevronLeft from '#assets/icons/chevron-left.svg';
import chevronRight from '#assets/icons/chevron-right.svg';
import comment from '#assets/icons/comment.svg';
import cross from '#assets/icons/cross.svg';
import eyeSlash from '#assets/icons/eye-slash.svg';
/* PLOP_INJECT_IMPORT */
import eye from '#assets/icons/eye.svg';
import favoriteActive from '#assets/icons/favorite-active.svg';
import favorite from '#assets/icons/favorite.svg';
import gallery from '#assets/icons/gallery.svg';
import heart from '#assets/icons/heart.svg';
import homeActive from '#assets/icons/home-active.svg';
import home from '#assets/icons/home.svg';
import hospital from '#assets/icons/hospital.svg';
import lockSlash from '#assets/icons/lock-slash.svg';
import lock from '#assets/icons/lock.svg';
import logOut from '#assets/icons/log-out.svg';
import logo from '#assets/icons/logo.svg';
import mapActive from '#assets/icons/map-active.svg';
import map from '#assets/icons/map.svg';
import medal from '#assets/icons/medal.svg';
import messageEdit from '#assets/icons/message-edit.svg';
import messageQuestion from '#assets/icons/message-question.svg';
import notificationOutlined from '#assets/icons/notification-outlined.svg';
import notification from '#assets/icons/notification.svg';
import pathTime from '#assets/icons/path-time.svg';
import patients from '#assets/icons/patients.svg';
import profileActive from '#assets/icons/profile-active.svg';
import profile from '#assets/icons/profile.svg';
import search from '#assets/icons/search.svg';
import sequritySafe from '#assets/icons/sequrity-safe.svg';
import settings from '#assets/icons/settings.svg';
import sms from '#assets/icons/sms.svg';
import star from '#assets/icons/star.svg';
import userEdit from '#assets/icons/user-edit.svg';
import user from '#assets/icons/user.svg';

import { colors } from '#config';

import Debug from '#utils/debug';

const IconFiles = {
  /* PLOP_INJECT_KEY */
  eye: { component: eye, color: colors.grayscale['400'] },
  eyeSlash: { component: eyeSlash, color: colors.grayscale['400'] },
  call: { component: call },
  lockSlash: { component: lockSlash },
  calendarRemove: { component: calendarRemove },
  calendarEdit: { component: calendarEdit },
  calendarTick: { component: calendarTick },
  logOut: { component: logOut },
  sequritySafe: { component: sequritySafe },
  messageQuestion: { component: messageQuestion },
  settings: { component: settings },
  notificationOutlined: { component: notificationOutlined },
  heart: { component: heart },
  userEdit: { component: userEdit },
  chevronRight: { component: chevronRight },
  arrowRight: { component: arrowRight },
  comment: { component: comment },
  medal: { component: medal },
  patients: { component: patients },
  favoriteActive: { component: favoriteActive },
  favorite: { component: favorite },
  hospital: { component: hospital },
  pathTime: { component: pathTime },
  star: { component: star },
  search: { component: search },
  notification: { component: notification },
  profileActive: { component: profileActive },
  profile: { component: profile },
  appointments: { component: appointments },
  appointmentsActive: { component: appointmentsActive },
  mapActive: { component: mapActive },
  map: { component: map },
  homeActive: { component: homeActive },
  home: { component: home },
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

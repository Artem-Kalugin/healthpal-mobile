import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { BEUserResponseDto } from '#generated/__entities';

import { AuthParamList } from './Auth/types';
import { MainParamList } from './Main/types';
import { ModalsParamList } from './Modals/types';
import { PasswordRecoveryParamList } from './PasswordRecovery/types';

export enum AppRoutes {
  Onboarding = 'Onboarding',
  ProfileEditing = 'ProfileEditing',

  StackPasswordRecovery = 'PasswordRecovery',
  StackAuth = 'StackAuth',
  StackModals = 'StackModals',
  StackMain = 'StackMain',
}

export type AppParamList = {
  [AppRoutes.Onboarding]: undefined;
  [AppRoutes.ProfileEditing]: { user?: BEUserResponseDto };
  [AppRoutes.StackPasswordRecovery]: NavigatorScreenParams<PasswordRecoveryParamList>;
  [AppRoutes.StackAuth]: NavigatorScreenParams<AuthParamList>;
  [AppRoutes.StackMain]: NavigatorScreenParams<MainParamList>;
  [AppRoutes.StackModals]: NavigatorScreenParams<ModalsParamList>;
};

export type RootScreenProps<RouteName extends AppRoutes> = StackScreenProps<
  AppParamList,
  RouteName
>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends AppParamList {}
  }
}

import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { ModalsParamList } from './Modals/types';

export enum AppRoutes {
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  Onboarding = 'Onboarding',
  StackModals = 'StackModals',
}

export type AppParamList = {
  [AppRoutes.SignIn]: undefined;
  [AppRoutes.SignUp]: undefined;
  [AppRoutes.Onboarding]: undefined;
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

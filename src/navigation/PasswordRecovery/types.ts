import { StackScreenProps } from '@react-navigation/stack';

export enum PasswordRecoveryRoutes {
  PasswordRecoveryEmailInput = 'PasswordRecoveryEmailInput',
  PasswordRecoveryCodeInput = 'PasswordRecoveryCodeInput',
  PasswordRecoverySetPassword = 'PasswordRecoverySetPassword',
}

export type PasswordRecoveryParamList = {
  [PasswordRecoveryRoutes.PasswordRecoveryEmailInput]: undefined;
  [PasswordRecoveryRoutes.PasswordRecoveryCodeInput]: { phone: string };
  [PasswordRecoveryRoutes.PasswordRecoverySetPassword]: {
    phone: string;
    code: string;
  };
};

export type PasswordRecoveryScreenProps<
  RouteName extends PasswordRecoveryRoutes,
> = StackScreenProps<PasswordRecoveryParamList, RouteName>;

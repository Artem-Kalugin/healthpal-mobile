import { StackScreenProps } from '@react-navigation/stack';

export enum PasswordRecoveryRoutes {
  PasswordRecoveryPhoneInput = 'PasswordRecoveryPhoneInput',
  PasswordRecoveryCodeInput = 'PasswordRecoveryCodeInput',
  PasswordRecoverySetPassword = 'PasswordRecoverySetPassword',
}

export type PasswordRecoveryParamList = {
  [PasswordRecoveryRoutes.PasswordRecoveryPhoneInput]: undefined;
  [PasswordRecoveryRoutes.PasswordRecoveryCodeInput]: { phone: string };
  [PasswordRecoveryRoutes.PasswordRecoverySetPassword]: {
    phone: string;
    code: string;
    recoveryToken: string;
  };
};

export type PasswordRecoveryScreenProps<
  RouteName extends PasswordRecoveryRoutes,
> = StackScreenProps<PasswordRecoveryParamList, RouteName>;

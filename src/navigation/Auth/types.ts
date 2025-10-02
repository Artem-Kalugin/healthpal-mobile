import { StackScreenProps } from '@react-navigation/stack';

export enum AuthRoutes {
  SignIn = 'AuthSignIn',
  SignUp = 'AuthSignUp',
}

export type AuthParamList = {
  [AuthRoutes.SignIn]: undefined;
  [AuthRoutes.SignUp]: undefined;
};

export type AuthScreenProps<RouteName extends AuthRoutes> = StackScreenProps<
  AuthParamList,
  RouteName
>;

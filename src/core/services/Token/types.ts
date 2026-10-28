import type { TokenDecoded } from '#store/slices/runtime';

export enum TokenType {
  access = 'access',
  refresh = 'refresh',
}

export type TokenPayload = {
  id: string;
  registrationComplete: boolean;
};

export type TokenStorePort = {
  getToken: () => TokenDecoded | undefined;
  setToken: (token: TokenDecoded | undefined) => void;
};

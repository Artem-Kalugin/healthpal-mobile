import NetInfo from '@react-native-community/netinfo';

import type { InterceptorContext } from './types';

export const connectionInterceptor = async (
  contex?: InterceptorContext,
): Promise<void> => {
  const { isConnected } = await NetInfo.fetch();

  if (!isConnected) {
    throw new Error('No internet connection');
  }
};

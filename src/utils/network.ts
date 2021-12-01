import * as Network from 'expo-network';

export const verifyNetwork = async (): Promise<boolean> => {
  const response = await Network.getNetworkStateAsync();

  if (response.isConnected) {
    return true;
  }
  return false;
};

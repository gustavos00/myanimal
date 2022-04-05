import React, { createContext, useContext, useState } from 'react';
import { showError } from '../utils/error';

import * as auth from '../services/auth';
import storage from '../utils/storage';
import isEmpty from '../utils/isEmpty';
import UserContext from './user';
import StatesContext from './states';
import { storeExpoToken } from '../services/auth';
import { hasNotificationsPermissions } from '../utils/notifications';

interface HomeAddressStatusParams {
  haveAddress?: boolean;
}

interface AuthContextData {
  token: string | void;

  googleSignIn: () => Promise<false | void | HomeAddressStatusParams | undefined>;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string | void>();

  const { setAnimalData, setUser } = useContext(UserContext);
  const { setIsLoading } = useContext(StatesContext);

  const setTokenOnLocalStorage = async (token: string, salt: string) => {
    //Missing date
    try {
      await storage.save({ key: '@userAccess', data: { token, salt } });
    } catch (e) {
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }
  };

  const googleSignIn = async () => {
    let haveAddressStatus;

    try {
      setIsLoading(true);
      const response = await auth.GoogleSignIn();
      if (!response) return false;

      setToken(response.token);
      setAnimalData(response.animalData);
      setUser(response);
      haveAddressStatus = response.userAddress.idAddress !== null;
      await setTokenOnLocalStorage(response.accessToken, response.salt);

      const notificationsResponse = await hasNotificationsPermissions();
      if (!!notificationsResponse) {
        if (!response.token) {
          return console.log('missing token');
        }
        console.log('storing');
        storeExpoToken({ expoToken: notificationsResponse, token: response.token ?? '' });
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }

    return { haveAddress: haveAddressStatus };
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        googleSignIn,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

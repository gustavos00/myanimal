import React, { createContext, useContext, useState } from 'react';
import { showError } from '../utils/error';

import * as auth from '../services/auth';
import storage from '../utils/storage';
import isEmpty from '../utils/isEmpty';
import UserContext from './user';

interface HomeAddressStatusParams {
  haveAddress?: boolean;
}

interface AuthContextData {
  token: string | void;

  googleSignIn: () => Promise<false | HomeAddressStatusParams | undefined>;
  setToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string | void>();

  const { setAnimalData, setUser } = useContext(UserContext);

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
      const response = await auth.GoogleSignIn();
      if (!response) return false;

      setToken(response.token);
      setAnimalData(response.animalData);
      setUser(response);
      haveAddressStatus = !isEmpty(response.userAddress);
      await setTokenOnLocalStorage(response.accessToken, response.salt);
    } catch (e) {
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

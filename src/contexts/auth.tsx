import React, { createContext, useState } from 'react';
import { GoogleSignInProps } from '../interfaces/GoogleSignInProps';
import { showError } from '../utils/error';

import * as auth from '../services/auth';
import storage from '../utils/storage';
import isEmpty from '../utils/isEmpty';

interface AuthContextData {
  token: string | void;

  googleSignIn: () => Promise<false | GoogleSignInProps | undefined>;
  setToken: (token : string) => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string | void>();

  const setTokenOnLocalStorage = async (token: string, salt: string) => {
    //Missing date
    try {
      await storage.save({ key: '@userAccess', data: { token, salt } });
    } catch (e) {
      return showError(
        'Error: ' + e,
        'Apparently there was an error, try again'
      );
    }
  };

  const googleSignIn = async () => {
    let tempObj = {};

    try {
      const response = await auth.GoogleSignIn();
      if (!response) return false;
      console.log(response)

      setToken(response.token);
    //   setAnimalData(googleResponse.animalData);
    //   setUser(googleResponse);
      await setTokenOnLocalStorage(
        response.accessToken,
        response.salt
      );

      tempObj = {
        haveAddress: !isEmpty(response.userAddress),
        isValid: response ? true : false,
      };
    } catch (e) {
      return showError(
        'Error: ' + e,
        'Apparently there was an error, try again'
      );
    }

    return tempObj;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        googleSignIn,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

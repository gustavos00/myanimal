import React, { createContext, useState } from 'react';
import { AnimalInfoParams } from '../interfaces/AnimalInfoParams';
import { UserContextData } from '../interfaces/UserContextData';
import { showError } from '../utils/error';

import * as auth from '../services/auth';

interface AuthContextData {
  signed: boolean;
  token: string | void;
  user: UserContextData | void;

  googleSignIn: () => Promise<boolean | void>;
  pushAnimalData: (data: AnimalInfoParams) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserContextData | void>();
  const [token, setToken] = useState<string | void>();

  const googleSignIn = async () => {
    try {
      const response = await auth.GoogleSignIn();
      if (!response) return false;

      setToken(response.token);
      setUser(response);

      return true;
    } catch (e) {
      showError('Error: ' + e, 'Apparently there was an error, try again');
    }
    return;
  };

  const pushAnimalData = (data: AnimalInfoParams) => {
    console.log('its not pushing animal data to user state');
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        token,
        user,

        googleSignIn,
        pushAnimalData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

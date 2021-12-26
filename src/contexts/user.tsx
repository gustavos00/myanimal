import React, { createContext, SetStateAction, useState } from 'react';
import { AnimalInfoParams } from '../interfaces/AnimalInfoParams';
import { UserContextData } from '../interfaces/UserContextData';
import { GoogleSignInProps } from '../interfaces/GoogleSignInProps';
import { showError } from '../utils/error';

import * as auth from '../services/auth';

interface AuthContextData {
  signed: boolean;
  token: string | void;
  user: UserContextData | void;
  animalData: Array<AnimalInfoParams> | void;

  googleSignIn: () => Promise<false | GoogleSignInProps | undefined>;
  pushAnimalData: (data: AnimalInfoParams) => void;
  deleteAnimalData: (id: number) => void;
}

function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserContextData | void>();
  const [animalData, setAnimalData] = useState<Array<AnimalInfoParams>>();
  const [token, setToken] = useState<string | void>();

  const googleSignIn = async () => {
    try {
      const response = await auth.GoogleSignIn();
      if (!response) return false;

      setToken(response.token);
      setAnimalData(response.animalData);

      delete response.animalData;
      setUser(response);

      const tempObj = {
        haveAddress: !isEmpty(response.userAddress),
        isValid: response ? true : false,
      };

      return tempObj;
    } catch (e) {
      showError('Error: ' + e, 'Apparently there was an error, try again');
    }
    return;
  };

  const pushAnimalData = (data: AnimalInfoParams) => {
    if(animalData) {
      const tempObj = {
        ...data,
        arraykey: animalData.length + 1
      }
      if (animalData) {
        setAnimalData((animalData) => [...(animalData ?? []), tempObj]);
      }
    } else {
      showError('Error pushing animal data', 'Apparently there was adding your animal data, try again');
    }
  };

  const deleteAnimalData = (id: number) => {
    const temp = [...(animalData ?? [])];
    temp.splice(id-1); //ID start in 1, but where we are talking about the lenght
    setAnimalData(temp);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        token,
        user,
        animalData,

        googleSignIn,
        pushAnimalData,
        deleteAnimalData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

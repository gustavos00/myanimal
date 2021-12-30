import React, { createContext, useState } from 'react';
import { AnimalInfoParams } from '../interfaces/AnimalInfoParams';
import { UserContextData } from '../interfaces/UserContextData';
import { GoogleSignInProps } from '../interfaces/GoogleSignInProps';
import { showError } from '../utils/error';

import * as auth from '../services/auth';
import storage from '../utils/storage';
import isEmpty from '../utils/isEmpty';

interface AuthContextData {
  signed: boolean;
  token: string | void;
  user: UserContextData | void;
  animalData: Array<AnimalInfoParams> | void;

  googleSignIn: () => Promise<false | GoogleSignInProps | undefined>;
  pushAnimalData: (data: AnimalInfoParams) => void;
  deleteAnimalData: (id: number) => void;
  setAnimalDataGlobalFunction: (data: Array<AnimalInfoParams>) => void;
  setUserData: (data: UserContextData) => void;
}

interface UserGoogleData extends UserContextData {
  token: string;
  accessToken: string;
  salt: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserContextData | void>();
  const [animalData, setAnimalData] = useState<Array<AnimalInfoParams>>();
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
    let googleResponse: UserGoogleData;
    let tempObj = {};

    try {
      googleResponse = await auth.GoogleSignIn();
      if (!googleResponse) return false;

      setToken(googleResponse.token);
      setAnimalData(googleResponse.animalData);
      setUser(googleResponse);
      console.log(googleResponse)
      await setTokenOnLocalStorage(
        googleResponse.accessToken,
        googleResponse.salt
      );

      tempObj = {
        haveAddress: !isEmpty(googleResponse.userAddress),
        isValid: googleResponse ? true : false,
      };
    } catch (e) {
      return showError(
        'Error: ' + e,
        'Apparently there was an error, try again'
      );
    }

    return tempObj;
  };

  const pushAnimalData = (data: AnimalInfoParams) => {
    if (animalData) {
      const tempObj = {
        ...data,
        arraykey: animalData.length + 1,
      };
      if (animalData) {
        setAnimalData((animalData) => [...(animalData ?? []), tempObj]);
      }
    } else {
      return showError(
        'Error pushing animal data',
        'Apparently there was adding your animal data, try again'
      );
    }
  };

  const deleteAnimalData = (id: number) => {
    const temp = [...(animalData ?? [])];
    temp.splice(id - 1); //ID start in 1, but where we are talking about the lenght
    setAnimalData(temp);
  };

  const setUserData = (data: UserContextData) => {
    setUser(data);
  };

  const setAnimalDataGlobalFunction = (data: Array<AnimalInfoParams>) => {
    setAnimalData(data);
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
        setUserData,
        setAnimalDataGlobalFunction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

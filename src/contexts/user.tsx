import React, { createContext, useState } from 'react';
import { AnimalInfoParams } from '../types/AnimalInfoParams';
import { UserContextData } from '../types/UserContextData';
import { showError } from '../utils/error';

interface UserContextContent {
  user: UserContextData | void;
  animalData: Array<AnimalInfoParams> | void;

  pushAnimalData: (data: AnimalInfoParams) => void;
  deleteAnimalData: (id: number) => void;
  setAnimalData: (data: Array<AnimalInfoParams>) => void;
  setUser: (data: UserContextData) => void;
}

const UserContext = createContext<UserContextContent>({} as UserContextContent);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<UserContextData | void>();
  const [animalData, setAnimalData] = useState<Array<AnimalInfoParams>>();

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

  return (
    <UserContext.Provider
      value={{
        user,
        animalData,

        pushAnimalData,
        deleteAnimalData,
        setUser,
        setAnimalData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

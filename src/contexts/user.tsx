import React, { createContext, useState } from 'react';
import { AnimalInfoParams } from '../interfaces/AnimalInfoParams';
import { UserContextProps } from '../interfaces/UserContextData';
import { showError } from '../utils/error';

interface UserContextData {
  user: UserContextProps | void;
  animalData: Array<AnimalInfoParams> | void;

  pushAnimalData: (data: AnimalInfoParams) => void;
  deleteAnimalData: (id: number) => void;
  setAnimalData: (data: Array<AnimalInfoParams>) => void;
  setUser: (data: UserContextProps) => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<UserContextProps | void>();
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

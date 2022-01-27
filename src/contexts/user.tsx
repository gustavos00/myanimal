import React, { createContext, useState } from 'react';
import { AnimalData, AnimalDataWithArraykey } from '../types/AnimalData';
import { UserData } from '../types/UserData';
import { showError } from '../utils/error';

interface UserContextContent {
  user: UserData | void;
  animalData: Array<AnimalData> | void;

  pushAnimalData: (data: AnimalData) => void;
  deleteAnimalData: (id: number) => void;
  setAnimalData: (data: Array<AnimalDataWithArraykey>) => void;
  setUser: (data: UserData) => void;
}

const UserContext = createContext<UserContextContent>({} as UserContextContent);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<UserData | void>();
  const [animalData, setAnimalData] = useState<Array<AnimalDataWithArraykey>>();

  const pushAnimalData = (data: AnimalData) => {
    if (animalData) {
      const tempObj = {
        ...data,
        arrayKey: animalData.length + 1,
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

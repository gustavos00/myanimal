import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { AnimalDataWithArraykey } from '../types/AnimalData';
import { VeterinarianData } from '../types/VeterinarianData';
import UserContext from './user';

interface VeterinariansContextContent {
  veterinarians: Array<VeterinarianData> | void;
  setVeterinarians: Dispatch<SetStateAction<VeterinarianData[] | undefined>>;

  deleteAnimalVeterinarian: (idAnimal: number | undefined) => void;
  updateAnimalVeterinarian: (veterinarianData: VeterinarianData, idAnimal: number) => void;
}

const VeterinariansContext = createContext<VeterinariansContextContent>(
  {} as VeterinariansContextContent
);

export function VeterinariansProvider({ children }: any) {
  const [veterinarians, setVeterinarians] = useState<Array<VeterinarianData>>();
  const { animalData, setAnimalData } = useContext(UserContext);

  const updateAnimalVeterinarian = (veterinarianData: VeterinarianData, idAnimal: number) => {
    const tempAnimalData = animalData ?? [];
    const animalElementIndex = tempAnimalData.findIndex((element) => element.idAnimal == idAnimal);
    const animalElement = tempAnimalData[animalElementIndex as number];

    animalElement.userVeterinarian = veterinarianData.idUser ?? null;
    animalElement.userVeterinarianFk = veterinarianData;
    tempAnimalData.splice(animalElementIndex, 1);
    setAnimalData([...tempAnimalData, animalElement]);

    return animalElement;
  };

  const deleteAnimalVeterinarian = (idAnimal: number | undefined) => {
    const tempAnimalData = animalData ?? [];
    const animalElementIndex = tempAnimalData.findIndex((element) => element.idAnimal == idAnimal);
    const animalElement = tempAnimalData[animalElementIndex as number];

    animalElement.userVeterinarian = null;
    animalElement.userVeterinarianFk = null;
    tempAnimalData.splice(animalElementIndex, 1);
    setAnimalData([...tempAnimalData, animalElement]);

    return animalElement;
  };

  return (
    <VeterinariansContext.Provider
      value={{
        veterinarians,
        setVeterinarians,

        deleteAnimalVeterinarian,
        updateAnimalVeterinarian,
      }}
    >
      {children}
    </VeterinariansContext.Provider>
  );
}

export default VeterinariansContext;

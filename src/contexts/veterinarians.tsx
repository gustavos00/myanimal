import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { AnimalDataWithArraykey } from '../types/AnimalData';
import { VeterinarianData } from '../types/VeterinarianData';
import UserContext from './user';

interface VeterinariansContextContent {
  veterinarians: Array<VeterinarianData> | void;
  setVeterinarians: Dispatch<SetStateAction<VeterinarianData[] | undefined>>;

  updateAnimalVeterinarian: (veterinarianData: VeterinarianData, idAnimal: number) => {};
}

const VeterinariansContext = createContext<VeterinariansContextContent>(
  {} as VeterinariansContextContent
);

export function VeterinariansProvider({ children }: any) {
  const [veterinarians, setVeterinarians] = useState<Array<VeterinarianData>>();
  const { animalData, setAnimalData } = useContext(UserContext);

  const updateAnimalVeterinarian = (veterinarianData: VeterinarianData, idAnimal: number) => {
    const tempAnimalData = [...animalData ?? []]
    const animalElementIndex = animalData?.findIndex((element) => element.idAnimal == idAnimal)
    if(animalElementIndex && animalData) {
      const animalElement = animalData[animalElementIndex]
      animalElement.userVeterinarian = veterinarianData.idUser ?? 999
      animalElement.userVeterinarianFk = veterinarianData

      tempAnimalData.splice(animalElementIndex, 1)
      setAnimalData([...tempAnimalData, animalElement])
      return animalElement
    }
    setAnimalData([...tempAnimalData])
    return {}
  }

  return (
    <VeterinariansContext.Provider
      value={{
        veterinarians,
        setVeterinarians,

        updateAnimalVeterinarian,
      }}
    >
      {children}
    </VeterinariansContext.Provider>
  );
}

export default VeterinariansContext;

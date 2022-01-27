import React, { createContext, useState } from 'react';
import { AnimalDataWithArraykey } from '../types/AnimalData';

interface StatesContextContent {
  deleteAnimalModalData?: AnimalDataWithArraykey;
  isLoading?: boolean

  setDeleteAnimalModalData: (e: AnimalDataWithArraykey | undefined) => void;
  setIsLoading: (e: boolean) => void
}

const StatesContext = createContext<StatesContextContent>({} as StatesContextContent);

export function StatesProvider({ children }: any) {
  const [deleteAnimalModalData, setDeleteAnimalModalData] = useState<AnimalDataWithArraykey | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>();
  
  return (
    <StatesContext.Provider value={{ deleteAnimalModalData, isLoading, setIsLoading, setDeleteAnimalModalData }}>
      {children}
    </StatesContext.Provider>
  );
}

export default StatesContext;

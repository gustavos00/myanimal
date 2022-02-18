import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { VeterinarianData } from '../types/VeterinarianData';

interface VeterinariansContextContent {
  veterinarians: Array<VeterinarianData> | void;
  setVeterinarians: Dispatch<SetStateAction<VeterinarianData[] | undefined>>;
}

const VeterinariansContext = createContext<VeterinariansContextContent>(
  {} as VeterinariansContextContent
);

export function VeterinariansProvider({ children }: any) {
  const [veterinarians, setVeterinarians] = useState<Array<VeterinarianData>>();

  return (
    <VeterinariansContext.Provider
      value={{
        veterinarians,
        setVeterinarians,
      }}
    >
      {children}
    </VeterinariansContext.Provider>
  );
}

export default VeterinariansContext;

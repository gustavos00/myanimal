import React from 'react';
import { AnimalInfoParams } from '../../interfaces/AnimalInfoParams';

import Background from '../Background';
import BackgroundHeader from '../BackgroundHeader';
import GeneralAnimalElements from '../GeneralAnimalElements';
import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper';
import NoAnimalAlert from '../NoAnimalAlert';

interface HomeContentContainerProps {
  animalData: Array<AnimalInfoParams> | void;
  isEditing: boolean;
  setIsEditing: (e: boolean) => void;
}

function HomeContentContainer({ animalData, isEditing, setIsEditing }: HomeContentContainerProps) {
  return (
    <>
      <Background>
        {animalData?.length === 0 ? (
          <>
            <NoAnimalAlert />
          </>
        ) : (
          <>
            <BackgroundHeader isEditing={isEditing} text={'Your animals'} />
            <KeyboardAvoidingWrapper>
              <GeneralAnimalElements
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                animalData={animalData}
              />
            </KeyboardAvoidingWrapper>
          </>
        )}
      </Background>
    </>
  );
}

export default HomeContentContainer;

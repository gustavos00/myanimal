import React from 'react';
import { AnimalData } from '../../types/AnimalData';

import Background from '../Background';
import BackgroundHeader from '../BackgroundHeader';
import GenerateElements from '../GenerateAnimalElements';
import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper';
import NoAnimalAlert from '../NoAnimalAlert';

interface HomeContentContainerProps {
  animalData: Array<AnimalData> | void;
}

function HomeContentContainer({ animalData }: HomeContentContainerProps) {
  return (
    <>
      <Background>
        {animalData?.length === 0 ? (
          <>
            <NoAnimalAlert />
          </>
        ) : (
          <>
            <BackgroundHeader text={'Your animals'} />
            {/**TO DO -> REMOVE KEYBOARD AVOID WRAPPER */}
            <KeyboardAvoidingWrapper>
              {/** TO DO -> MAKE A CONFIRM MODAL TO CONFIRM DELETE */}
              <GenerateElements animalData={animalData} />
            </KeyboardAvoidingWrapper>
          </>
        )}
      </Background>
    </>
  );
}

export default HomeContentContainer;

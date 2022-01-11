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

function HomeContentContainer({ animalData}: HomeContentContainerProps) {
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
            <KeyboardAvoidingWrapper>
              <GenerateElements
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

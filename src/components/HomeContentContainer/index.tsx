import { useNavigation } from '@react-navigation/core';
import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AnimalData } from '../../types/AnimalData';

import StatesContext from '../../contexts/states';
import Background from '../Background';
import BackgroundHeader from '../BackgroundHeader';
import DataElement from '../DataElement';
import NoAnimalAlert from '../NoAnimalAlert';
import Scroll from '../Scroll';

interface HomeContentContainerProps {
  animalData: Array<AnimalData> | void;
}

function HomeContentContainer({ animalData }: HomeContentContainerProps) {
  const navigation = useNavigation();

  const { setDeleteAnimalModalData } = useContext(StatesContext);

  const handleDeleteAnimal = (data: any) => {
    setDeleteAnimalModalData(data);
  };

  const handleUpdateAnimal = (item: Object) => {
    navigation.navigate(
      'UpdateAnimal' as never,
      {
        animalInfo: item,
      } as never
    );
  };

  const handleViewAnimal = (item: Object) => {
    navigation.navigate(
      'ViewAnimal' as never,
      {
        animalInfo: item,
      } as never
    );
  };
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
            <Scroll>
              <>
                {animalData?.map((item, index) => (
                  <DataElement
                    key={index}
                    photoUrl={item.photoUrl}
                    title={item.name}
                    subTitle={item.breed}
                    haveSlider
                    handleOnPress={() => handleViewAnimal(item)}
                    sliderTrueText={'Edit'}
                    sliderFalseText={'Delete'}
                    sliderTrueFunction={() => handleUpdateAnimal(item)}
                    sliderFalseFunction={() => handleDeleteAnimal(item)}
                  />
                ))}
              </>
            </Scroll>
          </>
        )}
      </Background>
    </>
  );
}

const styles = StyleSheet.create({});

export default HomeContentContainer;

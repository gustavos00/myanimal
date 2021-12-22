import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity, View } from 'react-native';

import { AnimalInfoParams } from '../../interfaces/AnimalInfoParams';
import AnimalElement from '../AnimalElement';

interface GeneralAnimalElementsProps {
  animalData: Array<AnimalInfoParams> | undefined;
  isEditing: boolean;
  setIsEditing: (s: boolean) => void;
}

function GeneralAnimalElements({
  animalData,
  isEditing,
  setIsEditing,
}: GeneralAnimalElementsProps) {
  const navigation = useNavigation();
  const viewingAnimal = (item: Object) => {
    navigation.navigate(
      'ViewAnimal' as never,
      {
        animalInfo: item,
      } as never
    );
  };

  return (
    <>
      {animalData?.map((item, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              onPress={() => viewingAnimal(item)}
              onLongPress={() => setIsEditing(!isEditing)}
            >
              <AnimalElement
                isEditing={isEditing}
                animalData={item as AnimalInfoParams}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </>
  );
}

export default GeneralAnimalElements;

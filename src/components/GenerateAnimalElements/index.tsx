import React from 'react';
import { View } from 'react-native';

import { AnimalData } from '../../types/AnimalData';
import AnimalElement from '../AnimalElement';

interface GenerateElementsProps {
  animalData: Array<AnimalData> | void;
}

function GenerateElements({ animalData }: GenerateElementsProps) {
  return (
    <>
      {animalData?.map((item, index) => {
        return (
          <View key={index}>
            <AnimalElement animalData={item as AnimalData} />
          </View>
        );
      })}
    </>
  );
}

export default GenerateElements;

import React from 'react';
import { View } from 'react-native';

import { AnimalInfoParams } from '../../interfaces/AnimalInfoParams';
import AnimalElement from '../AnimalElement';

interface GenerateElementsProps {
  animalData: Array<AnimalInfoParams> | void;
}

function GenerateElements({ animalData }: GenerateElementsProps) {
  return (
    <>
      {animalData?.map((item, index) => {
        return (
          <View key={index}>
            <AnimalElement animalData={item as AnimalInfoParams} />
          </View>
        );
      })}
    </>
  );
}

export default GenerateElements;

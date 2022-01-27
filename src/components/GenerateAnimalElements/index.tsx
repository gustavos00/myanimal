import React from 'react';
import { View, StyleSheet } from 'react-native';

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
          <View style={styles.container} key={index}>
            <AnimalElement animalData={item as AnimalData} />
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10, marginHorizontal: 10
  }
})

export default GenerateElements;

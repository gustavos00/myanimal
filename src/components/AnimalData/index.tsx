import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimalDataElement from '../AnimalDataElement';

function AnimalData() {
  return (
    <>
        <View style={styles.dataAnimalContainer}>
          <View style={styles.arrowImage}></View>

          <View style={styles.dataAnimal}>
            <AnimalDataElement imageName={""} value={""}/>
            <AnimalDataElement imageName={""} value={""}/>
            <AnimalDataElement imageName={""} value={""}/>
          </View>

          <View style={styles.arrowImage}></View>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  dataAnimalContainer: {
    width: '100%',
    zIndex: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    position: 'absolute',
    top: 155,
  },

  dataAnimal: {
    width: 250,
    height: 80,

    backgroundColor: '#E29756',
    borderRadius: 7,
    
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  arrowImage: {
    width: 30,
    height: 30,

    borderRadius: 30,
    
    backgroundColor: 'red',
  },
})


export default AnimalData;

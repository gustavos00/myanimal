import React, { ReactNode } from 'react';
import { View, Text, StyleSheet} from 'react-native';

import Button from '../Button';

function NoAnimalAlert() {
  const createNewAnimal = () => {
    console.log('a')
  }

  return (
    <>
      <View style={styles.noAnimalContainer}>
        <Text style={styles.noAnimalText}>Apparently you don't have any animal yet 🙁</Text>
        <Button handleClick={createNewAnimal} text={'Create new animal'}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  noAnimalText: {
    textAlign: 'center',

    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 35,
  },

  noAnimalContainer: {
    alignItems: 'center',
  }
})

export default NoAnimalAlert;

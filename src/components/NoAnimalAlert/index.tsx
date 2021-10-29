import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../../assets/styles/global';
import Button from '../Button';

function NoAnimalAlert() {
  const navigation = useNavigation();
  
  const createNewAnimal = () => {
    navigation.navigate('CreateOrUpdateAnimal' as any)
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
    margin: 10,
    textAlign: 'center',

    color: globalStyles.black,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 35,
  },

  noAnimalContainer: {
    alignItems: 'center',
  }
})

export default NoAnimalAlert;

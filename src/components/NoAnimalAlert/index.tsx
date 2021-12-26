import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../../assets/styles/global';
import CircleAddButton from '../CircleAddButton';

function NoAnimalAlert() {
  const navigation = useNavigation();

  const createNewAnimal = () => {
    navigation.navigate('CreateAnimal' as any);
  };

  return (
    <>
      <View style={styles.noAnimalContainer}>
        <Image
          style={styles.noAnimalImage}
          source={require('../../assets/img/noAnimal.png')}
        />

        <CircleAddButton handleClick={createNewAnimal} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  noAnimalText: {
    margin: 10,
    marginHorizontal: 25,
    textAlign: 'center',

    color: globalStyles.black,
    fontSize: 19,
    lineHeight: 35,
  },

  noAnimalImage: { width: 300, height: 300, marginVertical: 30 },

  noAnimalContainer: {
    alignItems: 'center',
  },
});

export default NoAnimalAlert;

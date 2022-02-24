import React from 'react';
import globalStyles from '../../assets/styles/global';
import CircleAddButton from '../CircleAddButton';

import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function NoAnimalAlert() {
  const navigation = useNavigation();

  const createNewAnimal = () => {
    navigation.navigate('CreateAnimal' as any);
  };

  return (
    <>
      <View style={styles.noAnimalContainer}>
        <Image style={styles.noAnimalPhoto} source={require('../../assets/img/noAnimal.png')} />

        <CircleAddButton handleClick={createNewAnimal} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  noAnimalPhoto: { width: 300, height: 300, marginVertical: globalStyles.smallerGap },

  noAnimalContainer: {
    alignItems: 'center',
  },
});

export default NoAnimalAlert;

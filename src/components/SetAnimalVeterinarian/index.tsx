import React, { ReactNode } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { VeterinarianData } from '../../types/VeterinarianData';
import { useNavigation } from '@react-navigation/core';

import globalStyles from '../../assets/styles/global';
import BackgroundHeader from '../BackgroundHeader';
import DataElement from '../DataElement';
import Button from '../Button';

interface SetAnimalVeterinarianProps {
  data: VeterinarianData | null;
  idAnimal: number;
}

function SetAnimalVeterinarian({ data, idAnimal }: SetAnimalVeterinarianProps) {
  const navigation = useNavigation();

  if (!!data) {
    return (
      <View style={styles.container}>
        <BackgroundHeader text={'Animal Vet'} />

        <DataElement
          photoUrl={data.photoUrl}
          title={data.givenName}
          subTitle={data.location}
          haveSlider
          sliderFalseColor={'green'}
          sliderTrueText={'Chat'}
          sliderFalseText={'View documents'}
          sliderTrueFunction={() => navigation.navigate('Chat' as never, { data } as never)}
          sliderFalseFunction={() => console.log('To do -> View animal documents')}
          handleOnPress={() =>
            navigation.navigate(
              'ViewVeterinarianProfile' as never,
              { veterinarianData: data, isUserAnimalVeterinarian: true, idAnimal } as never
            )
          }
        />
      </View>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <BackgroundHeader text={'Animal Vet'} />

          <Button
            text={'Get a vet!'}
            handleClick={() => navigation.navigate('Veterinarians' as never, { idAnimal } as never)}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: globalStyles.fullDeviceWidth,
    marginTop: 20,
  },
});

export default SetAnimalVeterinarian;

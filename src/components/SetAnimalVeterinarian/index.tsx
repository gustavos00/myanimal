import React, { ReactNode } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { VeterinarianData } from '../../types/VeterinarianData';
import { useNavigation } from '@react-navigation/core';

import globalStyles from '../../assets/styles/global';
import BackgroundHeader from '../BackgroundHeader';
import DataElement from '../DataElement';

interface SetAnimalVeterinarianProps {
  data: VeterinarianData;
}

function SetAnimalVeterinarian({ data }: SetAnimalVeterinarianProps) {
  const navigation = useNavigation();
  console.log(data);

  if (!!data) {
    return (
      <View style={styles.container}>
        <BackgroundHeader text={'Animal Vet'} />

        <DataElement
          photoUrl={data.photoUrl}
          title={data.givenName}
          subTitle={data.location}
          handleOnPress={() =>
            navigation.navigate(
              'ViewVeterinarianProfile' as never,
              { veterinarianData: data, isUserAnimalVeterinarian: true } as never
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

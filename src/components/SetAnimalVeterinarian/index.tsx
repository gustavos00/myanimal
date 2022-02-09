import React, { ReactNode } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { VeterinarianData } from '../../types/VeterinarianData';

import globalStyles from '../../assets/styles/global';
import BackgroundHeader from '../BackgroundHeader';
import DataElement from '../DataElement';

interface SetAnimalVeterinarianProps {
  data: VeterinarianData;
}

function SetAnimalVeterinarian({ data }: SetAnimalVeterinarianProps) {
  return (
    <View style={styles.container}>
      <BackgroundHeader text={'Animal Vet'} />

      <DataElement
        photoUrl={data.photoUrl}
        title={data.name}
        subTitle={data.location}
        sliderTrueText={'Chat'}
        sliderFalseText={'Remove'}
        sliderFalseFunction={() => console.log('test')}
        sliderTrueFunction={() => console.log('test')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: globalStyles.fullDeviceWidth,
    marginTop: 20,
  },
});

export default SetAnimalVeterinarian;

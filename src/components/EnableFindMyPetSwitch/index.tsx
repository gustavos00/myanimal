import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import globalStyles from '../../assets/styles/global';
import StyledSwitch from '../StyledSwitch/index';

interface EnableFindMyPetSwitchProps {
  enableFunction?: (state : boolean) => void;
  enableValue: boolean
}

function EnableFindMyPetSwitch({ enableFunction, enableValue }: EnableFindMyPetSwitchProps) {
  return (
    <>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Enable find my pet</Text>
        <StyledSwitch enableFunction={enableFunction} enableValue={enableValue} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    width: '90%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  switchText: {
    color: globalStyles.darkGray
  }
})

export default EnableFindMyPetSwitch;

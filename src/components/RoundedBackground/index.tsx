import React, { ReactChild } from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import globalStyles from '../../assets/styles/global';

interface RoundedBackgroundProps {
  top: boolean,
  children: ReactChild
}

function RoundedBackground({ top, children }: RoundedBackgroundProps) {
  return (
    <>
      <View style={[styles.bg, top ? styles.top : styles.bottom]}>
        {children}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '80%',
    
    backgroundColor: globalStyles.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  top: {
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  bottom: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  }
})

export default RoundedBackground;

import React, { ReactChild } from 'react';
import { View, StyleSheet} from 'react-native';
import globalStyles from '../assets/styles/global';

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
    
    backgroundColor: globalStyles.white
  },

  top: {
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,

    height: 673,
  },

  bottom: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,

    height: 673,
  }
})

export default RoundedBackground;

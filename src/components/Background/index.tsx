import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native'
import globalStyles from '../../assets/styles/global';

interface BackgroundProps {
  children: ReactNode;
}

function Background({ children }: BackgroundProps) {


  return (
    <>
      <View style={styles.bg}>
        {children}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '80%',
    paddingTop: 20,

    position: 'absolute',
    bottom: 0,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.13,
    shadowRadius: 5,

    backgroundColor: globalStyles.white,
    borderRadius: 35
  }
})

export default Background;

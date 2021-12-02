import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native'
import globalStyles from '../../assets/styles/global';

interface BackgroundProps {
  children: ReactNode;
  heightSize?: string
}

function Background({ children, heightSize }: BackgroundProps) {
  return (
    <>
      <View style={[styles.bg, heightSize ? {height: heightSize} : {height: '80%'}]}>
        {children}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',

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
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,

  }
})

export default Background;

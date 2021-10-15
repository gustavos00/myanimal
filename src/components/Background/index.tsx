import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native'
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
    height: 655,
    paddingTop: 30,

    position: 'absolute',
    bottom: 0,

    backgroundColor: globalStyles.white,
    borderRadius: 35
  }
})

export default Background;

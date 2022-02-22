import React from 'react';
import FastImage from 'react-native-fast-image';

import { StyleSheet } from 'react-native'

interface HeaderIconProps {
  photoUrl: string | undefined
}

function HeaderIcon({ photoUrl }: HeaderIconProps) {
  return (
    <>
      <FastImage style={styles.photo} source={{uri: photoUrl}}/>
    </>
  );
}

const styles = StyleSheet.create({
  photo: { 
    width: 75,
    height: 75,

    borderRadius: 100,
  },
})

export default HeaderIcon;

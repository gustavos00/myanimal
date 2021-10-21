import React from 'react';
import { View, Image, StyleSheet } from 'react-native'

interface HeaderIconProps {
  photoUrl: string | undefined
}

function HeaderIcon({ photoUrl }: HeaderIconProps) {
  return (
    <>
      <Image style={styles.image} source={{uri: photoUrl}}/>
    </>
  );
}

const styles = StyleSheet.create({
  image: { 
    width: 90,
    height: 90,

    borderRadius: 100,
  },
})

export default HeaderIcon;

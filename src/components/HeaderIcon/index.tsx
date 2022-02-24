import React from 'react';

import { StyleSheet, Image } from 'react-native'

interface HeaderIconProps {
  photoUrl: string | undefined
}

function HeaderIcon({ photoUrl }: HeaderIconProps) {
  return (
    <>
      <Image style={styles.photo} source={{uri: photoUrl}}/>
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

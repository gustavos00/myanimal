import React from 'react';

import { StyleSheet } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

interface HeaderIconProps {
  photoUrl: string | undefined;
}

function HeaderIcon({ photoUrl }: HeaderIconProps) {
  return (
    <>
      <Image style={styles.photo} uri={photoUrl ?? ''} />
    </>
  );
}

const styles = StyleSheet.create({
  photo: {
    width: 75,
    height: 75,

    borderRadius: 100,
  },
});

export default HeaderIcon;

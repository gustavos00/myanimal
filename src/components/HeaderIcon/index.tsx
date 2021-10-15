import React from 'react';
import { View, Image, StyleSheet } from 'react-native'

interface HeaderIconProps {
  photoUrl: string
}

function HeaderIcon({ photoUrl }: HeaderIconProps) {
  return (
    <>
      <View style={styles.image}>
        <Image  source={{uri: photoUrl}}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: { 
    width: 90,
    height: 90,

    backgroundColor: 'red',
    borderRadius: 100,
  },
})

export default HeaderIcon;

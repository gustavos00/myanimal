import React from 'react';
import {StyleSheet, Image } from 'react-native';

interface UserIconProps {
  imageUrl: string;
}

function UserIcon({ imageUrl }: UserIconProps) {
  return (
    <>
       <Image source={{uri: imageUrl}} style={styles.userImage} />
    </>
  );
}


const styles = StyleSheet.create({
  userImage: {
    width: 70,
    height: 70, 

    backgroundColor: 'red',
    borderRadius: 50,
  },
})

export default UserIcon;

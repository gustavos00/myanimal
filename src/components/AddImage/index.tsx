import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

import globalStyles from '../../assets/styles/global';

interface AddImageProps {
  widthSize?: string,
  heightSize?: string
}

function AddImage({ widthSize, heightSize }: AddImageProps) {
  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={.5} style={[styles.circle, widthSize ? {width: widthSize} : {width: 190}, heightSize ? {height: heightSize} : {height: 190}]}>
        <Image style={styles.image} source={require('../../assets/img/add.png')} />
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 

    position: 'absolute',
    top: '7%',

    elevation: 100,
    zIndex: 1000,
    
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    width: 190,    
    height: 190,

    borderRadius: 100,
    backgroundColor: globalStyles.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,

    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    width: '20%',
    height: '20%',
  }
})

export default AddImage;

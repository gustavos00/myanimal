import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker'

import globalStyles from '../../assets/styles/global';
import { useState } from 'react';

interface AddImageProps {
  widthSize?: string,
  heightSize?: string,
  setProfilePhotoFunction?: (url: string) => void;
}

function AddImage({ setProfilePhotoFunction, widthSize, heightSize }: AddImageProps) {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>()

  const openImageLibrary = async() => {
    const data = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(data.status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled && setProfilePhotoFunction) {
        setProfilePhotoFunction(result.uri);
        setPhotoUrl(result.uri);
      }
    } else {
      console.log(data)
    }
  }
  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={openImageLibrary} 
        activeOpacity={.5} 
        style={[styles.circle, widthSize ? {width: widthSize} : {width: 190}, heightSize ? {height: heightSize} : {height: 190}]}
      >
        {photoUrl ? 
          <Image style={styles.animalImage} source={{uri: photoUrl}} />
        : 
          <Image style={styles.image} source={require('../../assets/img/add.png')} />
        }
        
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
  },

  animalImage: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
  }
})

export default AddImage;

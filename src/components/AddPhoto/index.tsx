import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker'

import globalStyles from '../../assets/styles/global';
import { useState } from 'react';

interface AddPhotoProps {
  widthSize?: string,
  heightSize?: string,
  setProfilePhotoFunction?: (url: string) => void;
  photoUrl?: string
}

function AddPhoto({ photoUrl, setProfilePhotoFunction, widthSize, heightSize }: AddPhotoProps) {
  const [localPhotoUrl, setLocalPhotoUrl] = useState<string | undefined>(photoUrl)

  const openPhotoLibrary = async() => {
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
        setLocalPhotoUrl(result.uri);
      }
    } else {
      console.log(data)
    }
  }
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity 
          onPress={openPhotoLibrary} 
          activeOpacity={.5} 
          style={[styles.circle, widthSize ? {width: widthSize} : {width: 190}, heightSize ? {height: heightSize} : {height: 190}]}
        >
          {photoUrl || localPhotoUrl ? 
            <Image style={styles.animalPhoto} source={{uri: localPhotoUrl}} />
          : 
            <Image style={styles.photo} source={require('../../assets/img/add.png')} />
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

  photo: {
    width: '20%',
    height: '20%',
  },

  animalPhoto: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
  }
})

export default AddPhoto;

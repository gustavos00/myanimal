import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import api from '../../api/api';

import globalStyles from '../../assets/styles/global';

interface AnimalDataProps {
  age: string,
  chipnumber: string,
  id: number,
  name: string,
  photourl: string,
  race: string,
  userid: number,
}

interface AnimalElementProps {
  animalData: AnimalDataProps,
  isEditing: boolean
}

function AnimalElement({ animalData, isEditing } : AnimalElementProps) {
  const navigation = useNavigation();

  const deletingAnimal = async (id : number) => {
    let animalId = new FormData();
    animalId.append('id', String(id))

    const result = await api.post('/animal/delete', animalId);
    console.log('deleted')
  }

  const updatingAnimal = () => {
    navigation.navigate('UpdateAnimal' as never, {
      animalInfo: animalData
    } as never)
  }
  return (
    <>
      <View style={styles.element}>
        <Image source={{uri: animalData.photourl}} style={styles.icon}/>

        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{animalData.name}</Text>
          <Text style={styles.raceText}>{animalData.race}</Text>
        </View>

        <View style={styles.editContainer}>
          {isEditing && 
            <>  
              <TouchableOpacity onPress={updatingAnimal}>
                <Image source={require('../../assets/img/edit.png')} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deletingAnimal(animalData.id)}>
                <Image source={require('../../assets/img/delete.png')} />
              </TouchableOpacity>
            </>
          }
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  element: {
    margin: 12,
    padding: 15,

    backgroundColor: 'white',
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    
    elevation: 4,

    flexDirection: 'row',
  },

  icon: {
    width: 84,
    height: 84,
    borderRadius: 15,
  },

  textContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
   
  nameText: {
    color: globalStyles.black,
    fontSize: 18,
    fontWeight: 'bold'
  },

  raceText: {
    fontSize: 16,
    color: globalStyles.darkGray
  },

  editContainer: {
    width: 50,
    height: 114,

    position: 'absolute',
    right: 0,

    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
})

export default AnimalElement;

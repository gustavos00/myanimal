import React, { useState }from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import globalStyles from '../../assets/styles/global';

interface AnimalElementProps {
  name: string,
  race: string,
  imageUrl: string,
  isEditing: boolean
}

function AnimalElement({ name, race, imageUrl, isEditing }: AnimalElementProps) {
  return (
    <>
      <View style={styles.element}>
        <View style={styles.icon}></View>

        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.raceText}>{race}</Text>
        </View>

        <View style={styles.editContainer}>
          {isEditing && 
            <>  
              <Image source={require('../../assets/img/edit.png')} />
              <Image source={require('../../assets/img/delete.png')} />
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

    backgroundColor: 'red',
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

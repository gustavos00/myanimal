import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, View } from "react-native";

import api from '../api/api';

import globalStyles from "../assets/styles/global";
import Header from "../components/Header";
import Background from "../components/Background";
import Button from "../components/Button";


const Home = () => {
  const [haveAnimals, setHaveAnimals] = useState(true);

  const createNewAnimal = () => {
    console.log('a')
  }

  return (
    <>
      <Header />

      <Background>
        <>
          { haveAnimals ?
            <View style={styles.noAnimalContainer}>
              <Text style={styles.noAnimalText}>Apparently you don't have any animal yet 🙁</Text>
              <Button handleClick={createNewAnimal} text={'Create new animal'}/>
            </View>
          :
            <>
              <Text>no</Text>
            </>
          }
        </>
      </Background>
    </> 
)}


const styles = StyleSheet.create({
  noAnimalText: {
    textAlign: 'center',

    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 35,
  },

  noAnimalContainer: {
    alignItems: 'center',
  }
})

export default Home
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, View } from "react-native";

import api from '../api/api';

import globalStyles from "../assets/styles/global";
import Header from "../components/Header";
import Background from "../components/Background";
import NoAnimalAlert from "../components/NoAnimalAlert";
import BackgroundHeader from "../components/BackgroundHeader";
import AnimalElement from "../components/AnimalElement";
import { ScrollView } from "react-native-gesture-handler";


const Home = () => {
  const [haveAnimals, setHaveAnimals] = useState(true);

  const animalData = [
    {
      name: 'Gustavo1',
      race: 'Cao',
      image: ''
    },    {
      name: 'Gustavo1',
      race: 'Cao',
      image: ''
    },    {
      name: 'Gustavo1',
      race: 'Cao',
      image: ''
    },    {
      name: 'Gustavo1',
      race: 'Cao',
      image: ''
    },    {
      name: 'Gustavo1',
      race: 'Cao',
      image: ''
    },
    {
      name: 'Gustavo1',
      race: 'Cao',
      image: ''
    },
    {
      name: 'Gustavo1',
      race: 'Cao',
      image: ''
    },
    {
      name: 'Gustavo1',
      race: 'Cao',
      image: ''
    }
  ]

  return (
    <>
      <Header />

      <Background>
        { !haveAnimals ?
          <NoAnimalAlert />
        :
          <>
            <BackgroundHeader text={'Your animals'} />

          <ScrollView>
            {animalData.map((item, index) => { 
              return <AnimalElement key={`key-${index}`} name={item.name} race={item.race} imageUrl={item.image} />
            })}
          </ScrollView>
          </>
        }
      </Background>
    </> 
)}


const styles = StyleSheet.create({

})

export default Home
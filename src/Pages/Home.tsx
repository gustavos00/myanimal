import React, { useState, useEffect } from "react";
import { useNavigation, } from '@react-navigation/native';
import { StyleSheet, ScrollView, View, TouchableOpacity} from "react-native";

import * as SecureStore from 'expo-secure-store';

import api from '../api/api';

import Header from "../components/Header";
import Background from "../components/Background";
import NoAnimalAlert from "../components/NoAnimalAlert";
import BackgroundHeader from "../components/BackgroundHeader";
import AnimalElement from "../components/AnimalElement";
import Footer from "../components/Footer";

interface animalData {
  age: string,
  chipnumber: string,
  id: string,
  name: string,
  photourl: string,
  race: string,
  userid: string,
}

interface userData {
  id: string,
  givenname: string,
  lastname: string,
  photo: string,
  email: string
  animalData: Array<animalData>,
}

const Home = () => {
  const [user, setUser] = useState<userData>();
  const [isEditing, setIsEditing] = useState(false);

  const getUserData = async() => {
    try {
      const token = await SecureStore.getItemAsync('token')
      const { data } = await api.get(`/user/${token}`) 
      
      setUser(data)
    } catch {
      console.log('Error #0201')
    }
  }
  
  useEffect(() => {
    async function getData() {
      await getUserData()
    }
    getData()
  }, [])

  return (
    <>
      <Header name={user?.givenname} image={user?.photo}/>

      <Background>
        <>
          <BackgroundHeader isEditing={isEditing} text={'Your animals'} />

          <ScrollView>
            { user?.animalData?.map((item, index) => { 
              return (
                <View key={index}>
                  <TouchableOpacity onLongPress={() => setIsEditing(!isEditing)}>
                    <AnimalElement isEditing={isEditing} name={item.name} race={item.race} imageUrl={item.photourl} />
                  </TouchableOpacity>
                </View>
                
              )
            }) }
          </ScrollView>
        </>        
      </Background>

      <Footer />
    </> 
)}


const styles = StyleSheet.create({

})

export default Home


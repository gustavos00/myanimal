import React, { useContext, useState } from "react";
import {ScrollView, View, TouchableOpacity} from "react-native";

import Header from "../components/Header";
import Background from "../components/Background";
import NoAnimalAlert from "../components/NoAnimalAlert";
import BackgroundHeader from "../components/BackgroundHeader";
import AnimalElement from "../components/AnimalElement";
import Footer from "../components/Footer";
import AuthContext from "../contexts/user";
import { useNavigation } from '@react-navigation/core';


const Home = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const changingToSettings = (item : Object) => {
    navigation.navigate('CreateOrUpdateAnimal' as never, {
      type: 'view',
      animalInfo: item
    } as never)
  }
  

  return (
    <>
      <Header name={user?.givenname} image={user?.photourl}/>

      <Background>
        <ScrollView>
          {user?.animalData.length === 0 ? 
          <>
            <NoAnimalAlert />
          </>
          :
          <>
            <BackgroundHeader isEditing={isEditing} text={'Your animals'} />
            { user?.animalData.map((item, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity onPress={() => changingToSettings(item)} onLongPress={() => setIsEditing(!isEditing)}>
                    <AnimalElement isEditing={isEditing} name={item.name} race={item.race} imageUrl={item.photourl} />
                  </TouchableOpacity>
                </View>
              )
              })}
          </>
          }
        </ScrollView>       
      </Background>

      <Footer wichActive={'home'}/>
    </>
)}


export default Home


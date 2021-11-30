import React, { useContext, useState } from "react";
import {ScrollView, View, TouchableOpacity, Text} from "react-native";
import { AnimalInfoParams } from "../interfaces/AnimalInfoParams";

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
  const { user, pushAnimalData } = useContext(AuthContext);
  const navigation = useNavigation();

  const viewingAnimal = (item : Object) => {
    navigation.navigate('ViewAnimal' as never, {
      animalInfo: item
    } as never)
  }

  return (
    <>
      <Header name={user?.givenname} image={user?.photourl}/>

      <Background>
        {user?.animalData.length === 0 ? 
          <>
            <NoAnimalAlert />
          </>
          :
          <>d
            <BackgroundHeader isEditing={isEditing} text={'Your animals'} />
            <ScrollView>
              { user?.animalData.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity onPress={() => viewingAnimal(item)} onLongPress={() => setIsEditing(!isEditing)}>
                      <AnimalElement isEditing={isEditing} animalData={item as AnimalInfoParams} />
                    </TouchableOpacity>
                  </View>
                )
                })}
                <View style={{marginBottom: 100}}/>
            </ScrollView>    
        </>
        }
      </Background>

      <Footer wichActive={'home'}/>
    </>
)}


export default Home


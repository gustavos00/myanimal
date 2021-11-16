import React, { useContext, useState } from "react";
import {ScrollView, View, TouchableOpacity} from "react-native";

import Header from "../components/Header";
import Background from "../components/Background";
import NoAnimalAlert from "../components/NoAnimalAlert";
import BackgroundHeader from "../components/BackgroundHeader";
import AnimalElement from "../components/AnimalElement";
import Footer from "../components/Footer";
import AuthContext from "../contexts/user";
import ConfirmModal from "../components/ConfirmModal";

import { useNavigation } from '@react-navigation/core';

interface AnimalDataProps {
  age: string,
  chipnumber: string,
  id: number,
  name: string,
  photourl: string,
  race: string,
  userid: number,
}

const Home = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
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
                  <TouchableOpacity onPress={() => viewingAnimal(item)} onLongPress={() => setIsEditing(!isEditing)}>
                    <AnimalElement isEditing={isEditing} animalData={item as AnimalDataProps} />
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


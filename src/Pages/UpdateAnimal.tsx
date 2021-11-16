import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/core';
import { RootStackParamList } from '../navigator/MainStack';
import { StyleSheet, View, Text } from 'react-native';

import api from '../api/api';

import globalStyles from '../assets/styles/global';
import AddImage from '../components/AddImage';
import Background from '../components/Background';
import Button from '../components/Button';
import CreateOrUpdateSwitch from '../components/EnableFindMyPetSwitch';
import Footer from '../components/Footer/index';
import Input from '../components/Input';
import AuthContext from '../contexts/user';

function UpdateAnimal() {
  const route = useRoute<RouteProp<RootStackParamList, 'UpdateAnimal'>>();;
  const { animalInfo } = route.params;

  const [name, setName] = useState<string>(animalInfo.name)
  const [age, setAge] = useState<string>(animalInfo.age)
  const [race, setRace] = useState<string>(animalInfo.race)
  const [chipnumber, setChipnumber] = useState<string>(animalInfo.chipnumber)
  const [photoUrl, setPhotoUrl] = useState<string>(animalInfo.photourl)
  const [error, setError] = useState<string>('')
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const { pushAnimalData } = useContext(AuthContext);

  const handleSubmitForm = async () => {
    let animalData = new FormData();

    animalData.append('name', name)
    animalData.append('id', String(animalInfo.id))
    animalData.append('age', age)
    animalData.append('race', race)
    animalData.append('chipnumber', chipnumber)
    animalData.append('file', {
      uri: photoUrl,
      name: 'animalPhoto',
      type: 'image/png'
    } as any);
    
    const result = await api.post('/animal/update', animalData)
    const { data } = result
    pushAnimalData(data as any)
  }

  const handleChangeText = (e: string, type: string, setFunction: Dispatch<SetStateAction<string>>) => {
    switch (type) {
      case 'string':
        setFunction(e)
        break;

      case 'number':
        if(isNaN(Number(e))) {
          setError('Please, insert a valid age')
        } else {
          setError('')
          setAge(e)
        }
        break;
    
      default:
        break;
    }
  }

  return (
    <>
      <View style={styles.headerBg}>
        <AddImage animalPhotoUrl={animalInfo.photourl} setProfilePhotoFunction={setPhotoUrl}/>

        <Background heightSize={'75%'}>
          <View style={styles.container}>
            <View style={styles.inputsContainer}> 
              <Input handleChangeFunction={(e: string) => handleChangeText(e, 'string', setName)} text={name} placeholder={'Full Name'}/>
              <Input handleChangeFunction={(e: string) => handleChangeText(e, 'number', setAge)} text={age} placeholder={'Age'}/>
              <Input handleChangeFunction={(e: string) => handleChangeText(e, 'string', setRace)} text={race} placeholder={'Race'}/>
              <Input handleChangeFunction={(e: string) => handleChangeText(e, 'string', setChipnumber)} text={chipnumber} placeholder={'Chip Number'}/>
            </View>
                        
            <CreateOrUpdateSwitch enableFunction={setIsEnabled} enableValue={isEnabled}/>
            <Button text={'Update animal'} handleClick={handleSubmitForm}/>

            <Text>{error}</Text>
          </View>
        </Background>
      </View>

      <Footer wichActive={'home'}/>
    </>
  );
}

const styles = StyleSheet.create({
  headerBg: {
    flex: 1,

    justifyContent: 'center',

    backgroundColor: globalStyles.mainColor
  },

  inputsContainer: {
    width: '80%',
    marginTop: 40,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default UpdateAnimal;
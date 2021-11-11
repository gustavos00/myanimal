import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { RootStackParamList } from '../navigator/MainStack';

import api from '../api/api';

import globalStyles from '../assets/styles/global';
import AddImage from '../components/AddImage';
import Background from '../components/Background';
import Button from '../components/Button';
import CreateOrUpdateSwitch from '../components/EnableFindMyPetSwitch';
import Footer from '../components/Footer/index';
import Input from '../components/Input';
import AuthContext from '../contexts/user';
import StyledText from '../components/StyledText';
import ProfileImage from '../components/ProfileImage';


function CreateOrUpdateAnimal() {
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [race, setRace] = useState<string>('')
  const [chipnumber, setChipnumber] = useState<string>('')
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const {user, pushAnimalData} = useContext(AuthContext);

  const route = useRoute<RouteProp<RootStackParamList, 'CreateOrUpdateAnimal'>>();;
  //const { type } = route.params;

  const handleSubmitForm = async () => {
    let animalData = new FormData();

    animalData.append('name', name)
    animalData.append('age', age)
    animalData.append('race', race)
    animalData.append('chipnumber', chipnumber)
    animalData.append('email', user?.email ?? "")
    animalData.append('file', {
      uri: photoUrl,
      name: 'animalPhoto',
      type: 'image/png' // or your mime type what you want
    } as any);
    
    const result = await api.post('/animal/create', animalData)
    const { data } = result
    pushAnimalData(data as any)
  }

  const handleChangeText = (e: string, type: string, setFunction: Dispatch<SetStateAction<string>>) => {
    switch (type) {
      case 'string':
        
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
        <AddImage setProfilePhotoFunction={setPhotoUrl}/>

        <Background heightSize={'75%'}>
          <View style={styles.container}>
            <View style={styles.inputsContainer}> 
              <Input handleChangeFunction={(e: string) => handleChangeText(e, 'string', setName)} text={'Full Name'}/>
              <Input handleChangeFunction={(e: string) => handleChangeText(e, 'number', setAge)} text={'Age'}/>
              <Input handleChangeFunction={(e: string) => handleChangeText(e, 'string', setRace)} text={'Race'}/>
              <Input handleChangeFunction={(e: string) => handleChangeText(e, 'string', setChipnumber)} text={'Chip Number'}/>
            </View>
                        
            <CreateOrUpdateSwitch enableFunction={setIsEnabled} enableValue={isEnabled}/>
            <Button text={'Create new animal'} handleClick={handleSubmitForm}/>

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

export default CreateOrUpdateAnimal;

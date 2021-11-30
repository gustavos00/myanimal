import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { showError } from '../utils/error';
import { AnimalInfoParams } from '../interfaces/AnimalInfoParams';

import api from '../api/api';

import globalStyles from '../assets/styles/global';
import AddImage from '../components/AddImage';
import Background from '../components/Background';
import Button from '../components/Button';
import CreateOrUpdateSwitch from '../components/EnableFindMyPetSwitch';
import Footer from '../components/Footer/index';
import Input from '../components/Input';
import AuthContext from '../contexts/user';
import Loading from '../components/Loading';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

function CreateAnimal() {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [race, setRace] = useState<string>('')
  const [chipnumber, setChipnumber] = useState<string>('')
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {user, pushAnimalData} = useContext(AuthContext);

  const handleSubmitForm = async () => {
    setIsLoading(true)
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
    
    try {
      const result = await api.post('/animal/create', animalData)
      const { data } = result

      pushAnimalData(data as unknown as AnimalInfoParams)

      setIsLoading(false);
      navigation.navigate('Home' as any)
    } catch(e) {
      showError('Error: ' + e, 'Apparently there was an error, try again');
    }

    setIsLoading(false)
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
        showError('Error handle text on create animal');
        break;
    }
  }

  return (
    <>
      <View style={styles.headerBg}>
        <AddImage setProfilePhotoFunction={setPhotoUrl}/>

        <Background heightSize={'75%'}>
          <KeyboardAvoidingWrapper>
            <View style={styles.container}>
              <View style={styles.inputsContainer}> 
                <Input handleChangeFunction={(e: string) => handleChangeText(e, 'string', setName)} placeholder={'Full Name'}/>
                <Input handleChangeFunction={(e: string) => handleChangeText(e, 'number', setAge)} placeholder={'Age'}/>
                <Input handleChangeFunction={(e: string) => handleChangeText(e, 'string', setRace)} placeholder={'Race'}/>
                <Input handleChangeFunction={(e: string) => handleChangeText(e, 'string', setChipnumber)} placeholder={'Chip Number'}/>
              </View>
                          
              <CreateOrUpdateSwitch enableFunction={setIsEnabled} enableValue={isEnabled}/>
              <Button text={'Create new animal'} handleClick={handleSubmitForm}/>

              <Text>{error}</Text>
            </View>
          </KeyboardAvoidingWrapper>
        </Background>
      </View>

      <Footer wichActive={'home'}/>

      { isLoading &&
        <Loading /> 
      }
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

export default CreateAnimal;

import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import api from '../api/api';

import globalStyles from '../assets/styles/global';
import AddImage from '../components/AddImage';
import Background from '../components/Background';
import Button from '../components/Button';
import CreateOrUpdateSwitch from '../components/CreateOrUpdateSwitch';
import Footer from '../components/Footer/index';
import Input from '../components/Input';
import AuthContext from '../contexts/user';

interface CreateOrUpdateAnimalProps {
  type: string;
}

interface AnimalData {
  age: string,
  chipnumber: string,
  name: string,
  photo: string,
  race: string,
  userid: string,
}

function CreateOrUpdateAnimal({ type }: CreateOrUpdateAnimalProps) {
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [race, setRace] = useState<string>('')
  const [chipnumber, setChipnumber] = useState<string>('')
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const {user, pushAnimalData} = useContext(AuthContext);

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

  return (
    <>
      <View style={styles.headerBg}>
        <AddImage setProfilePhotoFunction={setPhotoUrl}/>

        <Background heightSize={'75%'}>
          <View style={styles.container}>
            <View style={styles.inputsContainer}> 
              <Input handleChangeFunction={(e: string) => setName(e)} text={'Full Name'}/>
              <Input handleChangeFunction={(e: string) => setAge(e)} text={'Age'}/>
              <Input handleChangeFunction={(e: string) => setRace(e)} text={'Race'}/>
              <Input handleChangeFunction={(e: string) => setChipnumber(e)} text={'Tracking code'}/>
            </View>
                        
            <CreateOrUpdateSwitch enableFunction={setIsEnabled} enableValue={isEnabled}/>
            <Button text={'Create new animal'} handleClick={handleSubmitForm}/>
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

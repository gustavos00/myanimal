import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import api from '../api/api';

import globalStyles from '../assets/styles/global';
import AddImage from '../components/AddImage';
import Background from '../components/Background';
import Button from '../components/Button';
import CreateOrUpdateSwitch from '../components/CreateOrUpdateSwitch';
import Footer from '../components/Footer/index';
import Input from '../components/Input';
import { getStorageItem } from '../utils/localStorage';

interface CreateOrUpdateAnimalProps {
  type: string;
}

interface getIdProps {
  id: string
}

interface createAnimalProps {
  fullname: string,
  age: string,
  race: string,
  chipnumber: string, 
  id: string
}

function CreateOrUpdateAnimal({ type }: CreateOrUpdateAnimalProps) {
  const [fullname, setFullname] = useState('')
  const [age, setAge] = useState('')
  const [race, setRace] = useState('')
  const [chipnumber, setChipnumber] = useState('')
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const handleSubmitForm = async () => {
    const token = await getStorageItem('token')

    let params = new URLSearchParams({
      token: token ?? "",
    })
    let res = await api.post('/user/id', params)
    const { id } = res.data as unknown as getIdProps

    params = new URLSearchParams({
      name: fullname,
      age,
      race,
      chipnumber,
      id
    })

    const result = await api.post('/animal/create', params)
  }

  return (
    <>
      <View style={styles.headerBg}>
        <AddImage />

        <Background heightSize={'75%'}>
          <View style={styles.container}>
            <View style={styles.inputsContainer}> 
              <Input handleChangeFunction={(e: string) => setFullname(e)} text={'Full Name'}/>
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

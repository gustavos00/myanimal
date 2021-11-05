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

interface CreateAnimalProps {
  name: string,
  age: string,
  race: string,
  chipnumber: string, 
  photo: string,
}

function CreateOrUpdateAnimal({ type }: CreateOrUpdateAnimalProps) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [race, setRace] = useState('')
  const [chipnumber, setChipnumber] = useState('')
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const { token, pushAnimalData } = useContext(AuthContext);

  const handleSubmitForm = async () => {
    const params = new URLSearchParams({
      name,
      age,
      race,
      chipnumber,
      token: token ?? '',
      photo: '',
    })

    const { data } = await api.post('/animal/create', params)
    const animalData = {
      name,
      age,
      race,
      chipnumber,
      userid: '',
      photo: '',
    }

    pushAnimalData(animalData)
  }

  return (
    <>
      <View style={styles.headerBg}>
        <AddImage />

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

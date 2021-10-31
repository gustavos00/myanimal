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

interface CreateOrUpdateAnimalProps {
  type: string;
}

function CreateOrUpdateAnimal({ type }: CreateOrUpdateAnimalProps) {
  const [fullname, setFullname] = useState<String>()
  const [age, setAge] = useState<String>()
  const [race, setRace] = useState<String>()
  const [chipnumber, setChipnumber] = useState<String>()
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const handleSubmitForm = () => {
    api.post('/animal/create')
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
            <Button text={'Create new animal'} handleClick={() => console.log('click')}/>
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

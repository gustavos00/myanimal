import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { showError } from '../utils/error';
import { AnimalData } from '../types/AnimalData';
import { generateFormData } from '../utils/FormData';

import api from '../api/api';

import globalStyles from '../assets/styles/global';
import AddPhoto from '../components/AddPhoto';
import Background from '../components/Background';
import Button from '../components/Button';
import CreateOrUpdateSwitch from '../components/EnableFindMyPetSwitch';
import Footer from '../components/Footer/index';
import Input from '../components/StyledInput';
import UserContext from '../contexts/user';
import Loading from '../components/Loading';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import StatesContext from '../contexts/states';

function CreateAnimal() {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [breed, setBreed] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [birthdayMonth, setBirthdayMonth] = useState<string>('');
  const [trackNumber, setTrackNumber] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const { isLoading, setIsLoading} = useContext(StatesContext);
  const { pushAnimalData, user } = useContext(UserContext);

  const handleSubmitForm = async () => {
    //Can't insert if exist a animal with same values
    //Check if error is a empty string
    if (!!error) {
      return console.log('Error');
    }

    if (photo === '') {
      //TO DO -> Fake photo or alert?
      return console.log('Missing photo');
    }

    if (!user) {
      showError('User dont exist on create animal', 'Apparently there was an error, try again');
      navigation.navigate('Home' as never, { haveAddress: true } as never);
    }

    const tempObj = {
      name,
      breed,
      age,
      birthday,
      birthdayMonth,
      trackNumber,
      token: user?.token,
    };
    const animalData = generateFormData(tempObj);
    animalData.append('animalPhoto', {
      uri: photo,
      name: 'animalPhoto',
      type: 'image/png',
    } as unknown as string | Blob);

    try {
      setIsLoading(true);
      const result = await api.post('/animal/create', animalData);
      //TO DO -> Just update local stuffs if can request
      pushAnimalData(result.data as unknown as AnimalData);
      setIsLoading(false);

      navigation.navigate('Home' as never, { haveAddress: true } as never);
    } catch (e) {
      setIsLoading(false);
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }
  };

  const handleChangeText = (
    value: string,
    setFunction: Dispatch<SetStateAction<string>>,
    valueLenght: number,
    type?: string
  ) => {
    let valueType = type ? type : 'string'; //Is string by default

    if (value.length > valueLenght) {
      //To do -> Create customs error messages
      return setError('Error message');
    } else {
      setError('');
    }

    if (valueType === 'string') {
      setFunction(value);
    } else if (valueType === 'number') {
      if (!isNaN(Number(value))) {
        setError('');
        setFunction(value);
        return;
      }
      setError('Please, insert a valid age');
    } else {
      return showError('Error handle text on create animal');
    }
  };

  return (
    <>
      <View style={styles.headerBg}>
        <AddPhoto setProfilePhotoFunction={setPhoto} />

        <Background heightSize={'75%'}>
          <KeyboardAvoidingWrapper>
            <View style={styles.container}>
              <View style={styles.inputsContainer}>
                <Input //Name
                  handleChangeFunction={(e: string) => handleChangeText(e, setName, 250)}
                  placeholder={'Name'}
                />
                <Input //Age
                  handleChangeFunction={(e: string) => handleChangeText(e, setAge, 5, 'number')}
                  placeholder={'Age'}
                />
                <Input //Breed
                  handleChangeFunction={(e: string) => handleChangeText(e, setBreed, 250)}
                  placeholder={'Breed'}
                />
                <Input //Birthday
                  handleChangeFunction={(e: string) => handleChangeText(e, setBirthday, 2)}
                  placeholder={'Birthday'}
                />
                <Input //Birthday month
                  handleChangeFunction={(e: string) => handleChangeText(e, setBirthdayMonth, 2)}
                  placeholder={'Birthday month'}
                />
                <Input //Track number
                  handleChangeFunction={(e: string) => handleChangeText(e, setTrackNumber, 50)}
                  placeholder={'Track number'}
                />
              </View>

              <CreateOrUpdateSwitch enableFunction={setIsEnabled} enableValue={isEnabled} />
              <Button text={'Create new pet'} handleClick={handleSubmitForm} />

              <Text>{error}</Text>
            </View>
          </KeyboardAvoidingWrapper>
        </Background>
      </View>

      <Footer wichActive={'home'} />

      {isLoading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  headerBg: {
    flex: 1,

    justifyContent: 'center',

    backgroundColor: globalStyles.mainColor,
  },

  inputsContainer: {
    width: '80%',
    marginTop: 40,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateAnimal;

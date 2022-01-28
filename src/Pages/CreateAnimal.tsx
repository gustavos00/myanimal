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
import Modal from '../components/Modal';
import BackgroundFilter from '../components/BackgroundFilter';

function CreateAnimal() {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();
  const [breed, setBreed] = useState<string | undefined>();
  const [birthday, setBirthday] = useState<string | undefined>();
  const [birthdayMonth, setBirthdayMonth] = useState<string | undefined>();
  const [trackNumber, setTrackNumber] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isNoPhotoModalOpen, setIsNoPhotoModalOpen] = useState<boolean>(false);

  const { isLoading, setIsLoading } = useContext(StatesContext);
  const { pushAnimalData, user } = useContext(UserContext);

  const handleSubmitForm = async () => {
    //Can't insert if exist a animal with same values
    //Check if error is a empty string
    if (!!error) {
      return console.log('Error');
    }
    if (!photo) {
      return setIsNoPhotoModalOpen(true);
    }
    if (!user) {
      showError('User dont exist on create animal', 'Apparently there was an error, try again');
      return navigation.navigate('Home' as never, { haveAddress: true } as never);
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
    setFunction: Dispatch<SetStateAction<any>>,
    valueLength: number,
    type?: string
  ) => {
    const textType = type && 'string';
    if (value.length > valueLength) {
      return setError('Length');
    } 

    if(textType as never == 'number') {
      return Number.isNaN(value) ? setFunction(value) : setError('Please, insert a valid age.')
    }

    setFunction(value)
    setError('')
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

                <CreateOrUpdateSwitch enableFunction={setIsEnabled} enableValue={isEnabled} />
              </View>

              {!!error && <Text>{error}</Text>}

              <Button text={'Create new pet'} handleClick={handleSubmitForm} />
            </View>
          </KeyboardAvoidingWrapper>
        </Background>
      </View>

      <Footer wichActive={'home'} />

      {isLoading && <Loading />}

      {isNoPhotoModalOpen && (
        <BackgroundFilter>
          <Modal
            title={'Somethign is missing..'}
            text={"Apparently you didn't post a picture of your pet, are you sure?"}
            noButtonText={'No'}
            yesButtonText={'Yes'}
            trueFunction={() => setIsNoPhotoModalOpen(false)}
            falseFunction={() => setIsNoPhotoModalOpen(false)}
          />
        </BackgroundFilter>
      )}
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

    alignItems: 'center',
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateAnimal;

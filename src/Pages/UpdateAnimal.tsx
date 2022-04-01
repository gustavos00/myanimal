import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../navigator/MainStack';
import { StyleSheet, View, Text } from 'react-native';
import { showError } from '../utils/error';
import { generateFormData } from '../utils/FormData';
import { AnimalData } from '../types/AnimalData';

import api from '../api/api';

import globalStyles from '../assets/styles/global';
import AddImage from '../components/AddPhoto';
import Background from '../components/Background';
import Button from '../components/Button';
import CreateOrUpdateSwitch from '../components/EnableFindMyPetSwitch';
import Footer from '../components/Footer/index';
import Input from '../components/StyledInput';
import UserContext from '../contexts/user';
import Loading from '../components/Loading';
import Scroll from '../components/Scroll';

import StatesContext from '../contexts/states';

function UpdateAnimal() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'UpdateAnimal'>>();
  const { animalInfo } = route.params;

  const [name, setName] = useState<string>(animalInfo.name);
  const [age, setAge] = useState<string>(animalInfo.age);
  const [breed, setBreed] = useState<string>(animalInfo.breed);
  const [birthday, setBirthday] = useState<string>(animalInfo.birthday);
  const [birthdayMonth, setBirthdayMonth] = useState<string>(animalInfo.birthdayMonth);
  const [trackNumber, setTrackNumber] = useState<string>(animalInfo.trackNumber);
  const [photoUrl, setPhotoUrl] = useState<string>(animalInfo.photoUrl);
  const [error, setError] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const { isLoading, setIsLoading } = useContext(StatesContext);
  const { pushAnimalData, deleteAnimalData } = useContext(UserContext);

  const handleSubmitForm = async () => {
    //Check if error is a empty string
    if (error === '') {
      const tempObj = {
        id: String(animalInfo.idAnimal),
        name,
        breed,
        age,
        birthday,
        birthdayMonth,
        trackNumber,
        idUser: String(animalInfo.userIdUser),
      };
      const animalData = generateFormData(tempObj);
      animalData.append('animalPhoto', {
        uri: photoUrl,
        name: 'animalPhoto',
        type: 'image/png', // or your mime type what you want
      } as unknown as string | Blob);

      try {
        setIsLoading(true);
        const result = await api.post('/animal/update', animalData);
        const data = result.data as unknown as AnimalData;

        deleteAnimalData(data.idAnimal);
        pushAnimalData({...animalInfo, ...data} as any);
        setIsLoading(false);

        navigation.navigate('Home' as never, { haveAddress: true } as never);
      } catch (e) {
        setIsLoading(false);
        return showError('Error: ' + e, 'Apparently there was an error, try again');
      }
    }
  };
  const handleChangeText = (
    value: string,
    setFunction: Dispatch<SetStateAction<string>>,
    valueLenght: number,
    type?: string
  ) => {
    if (value.length > valueLenght) {
      //Check string size
      setError('Error message');
      return;
    } else {
      setError('');
    }

    //Checkick text type
    let valueType = type ?? 'string';
    if (valueType === 'string') {
      setFunction(value);
    } else if (valueType === 'number') {
      if (isNaN(Number(value))) {
        setError('Please, insert a valid age');
      } else {
        setError('');
        setFunction(value);
      }
    } else {
      return showError('Error handle text on create animal');
    }
  };

  return (
    <>
      <View style={styles.headerBg}>
        <AddImage setProfilePhotoFunction={setPhotoUrl} photoUrl={photoUrl} />

        <Background heightSize={'75%'}>
          <Scroll aligned>
            <View style={styles.inputsContainer}>
              <Input
                width={'100%'}
                text={name}
                placeholder={'Name'}
                handleChangeFunction={(e: string) => handleChangeText(e, setName, 250)}
              />
              <Input
                width={'100%'}
                text={age}
                placeholder={'Age'}
                handleChangeFunction={(e: string) => handleChangeText(e, setAge, 3, 'number')}
              />
              <Input
                width={'100%'}
                text={breed}
                placeholder={'Breed'}
                handleChangeFunction={(e: string) => handleChangeText(e, setBreed, 250)}
              />
              <Input
                width={'100%'}
                text={birthday}
                placeholder={'Birthday'}
                handleChangeFunction={(e: string) => handleChangeText(e, setBirthday, 2)}
              />
              <Input
                width={'100%'}
                text={birthdayMonth}
                handleChangeFunction={(e: string) => handleChangeText(e, setBirthdayMonth, 2)}
                placeholder={'Birthday month'}
              />
              <Input
                width={'100%'}
                text={trackNumber}
                handleChangeFunction={(e: string) => handleChangeText(e, setTrackNumber, 250)}
                placeholder={'Track number'}
              />

              <CreateOrUpdateSwitch enableFunction={setIsEnabled} enableValue={isEnabled} />
              <Button text={'Update animal'} handleClick={handleSubmitForm} />

              <Text>{error}</Text>
            </View>
          </Scroll>
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

export default UpdateAnimal;

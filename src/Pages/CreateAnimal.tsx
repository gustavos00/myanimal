import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { showError } from '../utils/error';
import { AnimalInfoParams } from '../interfaces/AnimalInfoParams';

import api from '../api/api';

import globalStyles from '../assets/styles/global';
import AddPhoto from '../components/AddPhoto';
import Background from '../components/Background';
import Button from '../components/Button';
import CreateOrUpdateSwitch from '../components/EnableFindMyPetSwitch';
import Footer from '../components/Footer/index';
import Input from '../components/StyledInput';
import AuthContext from '../contexts/user';
import Loading from '../components/Loading';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { generateFormData } from '../utils/FormData';

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
  const [isLoading, setLoading] = useState<boolean>(false);

  const { pushAnimalData, token } = useContext(AuthContext);

  const handleSubmitForm = async () => {
    //Check if error is a empty string
    if (!!error) {
      return console.log('Error');
    }

    if (photo === '') {
      //Should i set a fake image or request a image?
      return console.log('Missing photo');
    }

    const tempObj = {
      name,
      breed,
      age,
      birthday,
      birthdayMonth,
      trackNumber,
    };
    const animalData = generateFormData(tempObj);
    animalData.append('animalPhoto', {
      uri: photo,
      name: 'animalPhoto',
      type: 'image/png',
    } as unknown as string | Blob);

    try {
      setLoading(true);
      const result = await api.post('/animal/create', animalData);
      pushAnimalData(result.data as unknown as AnimalInfoParams);
      setLoading(false);

      navigation.navigate('Home' as never, { isValid: true, haveAddress: true } as never);
    } catch (e) {
      setLoading(false);
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
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setAge, 5, 'number')
                  }
                  placeholder={'Age'}
                />
                <Input //Breed
                  handleChangeFunction={(e: string) => handleChangeText(e, setBreed, 250)}
                  placeholder={'Breed'}
                />
                <Input //Birthday
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setBirthday, 2)
                  }
                  placeholder={'Birthday'}
                />
                <Input //Birthday month
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setBirthdayMonth, 2)
                  }
                  placeholder={'Birthday month'}
                />
                <Input //Track number
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setTrackNumber, 50)
                  }
                  placeholder={'Track number'}
                />
              </View>

              <CreateOrUpdateSwitch
                enableFunction={setIsEnabled}
                enableValue={isEnabled}
              />
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

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
import Input from '../components/StyledInput';
import AuthContext from '../contexts/user';
import Loading from '../components/Loading';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

function CreateAnimal() {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [breed, setBreed] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [birthdayMonth, setBirthdayMonth] = useState<string>('');
  const [tracknumber, setTracknumber] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { pushAnimalData, token } = useContext(AuthContext);

  const handleSubmitForm = async () => {
    //Check if error is a empty string
    if (error === '') {
      setIsLoading(true);

      const animalData = new FormData();
      animalData.append('name', name);
      animalData.append('breed', breed);
      animalData.append('age', age);
      animalData.append('birthday', birthday);
      animalData.append('birthdayMonth', birthdayMonth);
      animalData.append('trackNumber', tracknumber);
      animalData.append('token', token ?? '');
      animalData.append('animalPhoto', {
        uri: photo,
        name: 'animalPhoto',
        type: 'image/png', // or your mime type what you want
      } as unknown as string | Blob);

      try {
        const result = await api.post('/animal/create', animalData);
        pushAnimalData(result.data as unknown as AnimalInfoParams);

        navigation.navigate('Home' as any);
      } catch (e) {
        showError('Error: ' + e, 'Apparently there was an error, try again');
      }
      setIsLoading(false);
    }
  };

  const handleChangeText = (
    value: string,
    setFunction: Dispatch<SetStateAction<string>>,
    valueLenght: number,
    type?: string
  ) => {
    if (value.length > valueLenght) {
      setError('Error message');
      return;
    } else {
      setError('');
    }

    let valueType = type ? type : 'string';
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
      showError('Error handle text on create animal');
    }
  };

  return (
    <>
      <View style={styles.headerBg}>
        <AddImage setProfilePhotoFunction={setPhoto} />

        <Background heightSize={'75%'}>
          <KeyboardAvoidingWrapper>
            <View style={styles.container}>
              <View style={styles.inputsContainer}>
                <Input //Name
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setName, 250)
                  }
                  placeholder={'Name'}
                />
                <Input //Age
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setAge, 5, 'number')
                  }
                  placeholder={'Age'}
                />
                <Input //Breed
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setBreed, 250)
                  }
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
                    handleChangeText(e, setTracknumber, 50)
                  }
                  placeholder={'Track number'}
                />
              </View>

              <CreateOrUpdateSwitch
                enableFunction={setIsEnabled}
                enableValue={isEnabled}
              />
              <Button
                text={'Create new animal'}
                handleClick={handleSubmitForm}
              />

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

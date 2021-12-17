import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../navigator/MainStack';
import { StyleSheet, View, Text } from 'react-native';

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
import { showError } from '../utils/error';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

function UpdateAnimal() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'UpdateAnimal'>>();
  const { animalInfo } = route.params;

  const [name, setName] = useState<string>(animalInfo.name);
  const [age, setAge] = useState<string>(animalInfo.age);
  const [breed, setBreed] = useState<string>(animalInfo.breed);
  const [birthday, setBirthday] = useState<string>(animalInfo.birthday);
  const [birthdayMonth, setBirthdayMonth] = useState<string>(
    animalInfo.birthdayMonth
  );
  const [trackNumber, setTrackNumber] = useState<string>(
    animalInfo.trackNumber
  );
  const [imageUrl, setImageUrl] = useState<string>(animalInfo.imageUrl);
  const [error, setError] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { pushAnimalData } = useContext(AuthContext);

  const handleSubmitForm = async () => {
    //Check if error is a empty string
    if (error === '') {
      const animalData = new FormData();
      animalData.append('id', String(animalInfo.idAnimal));
      animalData.append('name', name);
      animalData.append('breed', breed);
      animalData.append('age', age);
      animalData.append('birthday', birthday);
      animalData.append('birthdayMonth', birthdayMonth);
      animalData.append('trackNumber', trackNumber);
      animalData.append('idUser', String(animalInfo.userIdUser));
      animalData.append('animalPhoto', {
        uri: imageUrl,
        name: 'animalPhoto',
        type: 'image/png', // or your mime type what you want
      } as unknown as string | Blob);

      try {
        setIsLoading(true);
        const result = await api.post('/animal/update', animalData);
        const { data } = result;

        pushAnimalData(data as any);
        setIsLoading(false);

        navigation.navigate('Home' as any);
      } catch (e) {
        setIsLoading(false);
        showError('Error: ' + e, 'Apparently there was an error, try again');
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
      showError('Error handle text on create animal');
    }
  };

  return (
    <>
      <View style={styles.headerBg}>
        <AddImage
          animalImageUrl={animalInfo.imageUrl}
          setProfilePhotoFunction={setImageUrl}
        />

        <Background heightSize={'75%'}>
          <KeyboardAvoidingWrapper>
            <View style={styles.container}>
              <View style={styles.inputsContainer}>
                <Input //Name
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setName, 250)
                  }
                  text={name}
                  placeholder={'Name'}
                />
                <Input //Age
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setAge, 5, 'number')
                  }
                  text={age}
                  placeholder={'Age'}
                />
                <Input //Breed
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setBreed, 250)
                  }
                  text={breed}
                  placeholder={'Breed'}
                />
                <Input //Birthday
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setBirthday, 2)
                  }
                  text={birthday}
                  placeholder={'Birthday'}
                />
                <Input //Birthday month
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setBirthdayMonth, 2)
                  }
                  text={birthdayMonth}
                  placeholder={'Birthday month'}
                />
                <Input //Track number
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, setTrackNumber, 50)
                  }
                  text={trackNumber}
                  placeholder={'Track number'}
                />
              </View>

              <CreateOrUpdateSwitch
                enableFunction={setIsEnabled}
                enableValue={isEnabled}
              />
              <Button text={'Update animal'} handleClick={handleSubmitForm} />

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

export default UpdateAnimal;

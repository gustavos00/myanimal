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
import Input from '../components/Input';
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
    setIsLoading(true);

    const params = new URLSearchParams();
    params.append('name', name);
    params.append('breed', breed);
    params.append('age', age);
    params.append('birthday', birthday);
    params.append('birthdayMonth', birthdayMonth);
    params.append('trackNumber', tracknumber);
    params.append('token', token ?? '');

    try {
      const result = await api.post('/animal/create', params);
      pushAnimalData(result.data as unknown as AnimalInfoParams);

      navigation.navigate('Home' as any);
    } catch (e) {
      showError('Error: ' + e, 'Apparently there was an error, try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeText = (
    value: string,
    type: string,
    setFunction: Dispatch<SetStateAction<string>>
  ) => {
    switch (type) {
      case 'string':
        setFunction(value);
        break;

      case 'number':
        if (isNaN(Number(value))) {
          setError('Please, insert a valid age');
        } else {
          setError('');
          setFunction(value);
        }
        break;

      default:
        showError('Error handle text on create animal');
        break;
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
                <Input
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, 'string', setName)
                  }
                  placeholder={'Name'}
                />
                <Input
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, 'number', setAge)
                  }
                  placeholder={'Age'}
                />
                <Input
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, 'string', setBreed)
                  }
                  placeholder={'Breed'}
                />
                <Input
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, 'string', setBirthday)
                  }
                  placeholder={'Birthday'}
                />
                <Input
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, 'string', setBirthdayMonth)
                  }
                  placeholder={'Birthday month'}
                />
                <Input
                  handleChangeFunction={(e: string) =>
                    handleChangeText(e, 'string', setTracknumber)
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

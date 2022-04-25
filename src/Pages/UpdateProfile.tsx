import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { generateFormData } from '../utils/FormData';

import globalStyles from '../assets/styles/global';

import api from '../api/api';

import Background from '../components/Background';
import Button from '../components/Button';
import Footer from '../components/Footer';
import OptionHeader from '../components/OptionHeader';
import StyledInput from '../components/StyledInput';
import Underline from '../components/Underline';
import UserContext from '../contexts/user';
import AddPhoto from '../components/AddPhoto';
import Scroll from '../components/Scroll';
import StatesContext from '../contexts/states';
import { showError } from '../utils/error';
import Loading from '../components/Loading';

function UpdateProfile() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const { isLoading, setIsLoading } = useContext(StatesContext);

  const [streetName, setStreetName] = useState<string | undefined>(user?.userAddress.streetName);
  const [doorNumber, setDoorNumber] = useState<string | undefined>(user?.userAddress.doorNumber);
  const [postalCode, setPostalCode] = useState<string | undefined>(user?.userAddress.postalCode);
  const [parish, setParish] = useState<string | undefined>(user?.userAddress.parishName);
  const [locality, setLocality] = useState<string | undefined>(user?.userAddress.locationName);
  const [givenName, setGivenName] = useState<string | undefined>(user?.givenName);
  const [familyName, setFamilyName] = useState<string | undefined>(user?.familyName);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(user?.phoneNumber);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(user?.photoUrl);

  const handleSubmitForm = async () => {
    const tempObj = {
      id: user?.idUser,
      givenName,
      familyName,
      phoneNumber,
      idAddress: user?.userAddress,
      email: user?.email,
      isVeterinarian: user?.isVeterinarian,
    };

    const newUserData = generateFormData(tempObj);
    newUserData.append('userPhoto', {
      uri: photoUrl,
      name: 'userPhoto',
      type: 'image/png',
    } as unknown as string | Blob);

    try {
      setIsLoading(true);
      const response = await api.post('/user/update', newUserData);
      const cleanResponse = response.data as any;

      const localUserData = {
        ...user,
        givenName,
        familyName,
        phoneNumber,
        photoUrl: cleanResponse.photoUrl,
        photoName: cleanResponse.photoName,
      };

      setIsLoading(false);
      setUser(localUserData as any);
      navigation.navigate('Home' as never, { haveAddress: true } as never);
    } catch (e) {
      setIsLoading(false);
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }
  };

  return (
    <>
      <View style={styles.headerBg}>
        <AddPhoto photoUrl={photoUrl} setProfilePhotoFunction={setPhotoUrl} />

        <Background heightSize={'75%'}>
          <Scroll>
            <View style={styles.container}>
              <View style={styles.firstInputContainer}>
                <OptionHeader text={'Account information'} />

                <StyledInput
                  handleChangeFunction={setGivenName}
                  text={givenName}
                  placeholder={'Given Name'}
                />
                <StyledInput
                  handleChangeFunction={setFamilyName}
                  text={familyName}
                  placeholder={'Family Name'}
                />
                <StyledInput
                  handleChangeFunction={setPhoneNumber}
                  text={phoneNumber}
                  placeholder={'Phone number'}
                />
              </View>

              <Underline />
              <View style={styles.inputsContainer}>
                <OptionHeader text={'Address information'} />
                <StyledInput
                  handleChangeFunction={setStreetName}
                  text={streetName}
                  placeholder={'Street name'}
                />
                <StyledInput
                  handleChangeFunction={setDoorNumber}
                  text={doorNumber}
                  placeholder={'Door number'}
                />
                <StyledInput
                  handleChangeFunction={setPostalCode}
                  text={postalCode}
                  placeholder={'Postal code'}
                />
                <StyledInput handleChangeFunction={setParish} text={parish} placeholder={'City'} />
                <StyledInput
                  handleChangeFunction={setLocality}
                  text={locality}
                  placeholder={'Locality'}
                />
              </View>
              <Button text={'Save'} handleClick={handleSubmitForm} />
            </View>
          </Scroll>
        </Background>
      </View>

      <Footer wichActive={'settings'} />

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

  firstInputContainer: {
    width: '80%',
    marginTop: 40,
  },

  inputsContainer: {
    width: '80%',
    marginTop: 20,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UpdateProfile;

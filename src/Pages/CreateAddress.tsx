import { useNavigation } from '@react-navigation/core';
import React, { useContext, useState } from 'react';

import api from '../api/api'

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Button from '../components/Button';
import Header from '../components/Header';
import Loading from '../components/Loading';
import StyledInput from '../components/StyledInput';

import AuthContext from '../contexts/user';

function CreateAddress() {
  const [streetName, setStreetName] = useState<string>('');
  const [doorNumber, setDoorNumber] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const handleSubmit = async() => {
    const addressData = new URLSearchParams();
    addressData.append('streetName', streetName);
    addressData.append('doorNumber', doorNumber);
    addressData.append('postalCode', postalCode);

    try {
      setIsLoading(true);
      await api.post('/user/createAddress', addressData)
      setIsLoading(false);
      
      navigation.navigate('Home' as any)
    } catch(e) {
      console.log(1)
    }
    
  }


  return (
    <>
      <Header
        text={'You should register you address!'}
        name={user?.givenName}
        image={user?.imageUrl}
      />

      <Background>
        <BackgroundHeader text={'Your address'} />

        <StyledInput
          placeholder={'Street name'}
          handleChangeFunction={(e) => setStreetName(e)}
        />
        <StyledInput
          placeholder={'Postal code'}
          handleChangeFunction={(e) => setPostalCode(e)}
        />
        <StyledInput
          placeholder={'Door number'}
          handleChangeFunction={(e) => setDoorNumber(e)}
        />
      
        <Button
          text={'Create'}
          handleClick={handleSubmit}
        />
      </Background>

      {isLoading && <Loading />}
    </>
  );
}

export default CreateAddress;

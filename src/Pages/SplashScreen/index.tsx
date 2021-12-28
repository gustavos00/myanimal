import React, { useContext, useEffect } from 'react';
import storage from '../../utils/storage';
import api from '../../api/api'
import AuthContext from '../../contexts/user';

import { useNavigation } from '@react-navigation/core';
import { showError } from '../../utils/error';
import { UserContextData } from '../../interfaces/UserContextData';
import { AnimalInfoParams } from '../../interfaces/AnimalInfoParams';


function SplashScreen() {
  const navigation = useNavigation();
  const { setUserData, setAnimalDataGlobalFunction } = useContext(AuthContext)

  const getTokenFromLocalStorage = async () => {
    try {
      const accessResponse = await storage.load({ key: '@userAccess' });
      if(!!accessResponse) {
        const { salt, token } = accessResponse

        //API request
        let tokenData = new URLSearchParams();
        tokenData.append('salt', salt)
        tokenData.append('token', token);

        const response = await api.post('/user/access/verify', tokenData)
        const userData = response.data as unknown as UserContextData
        setUserData(userData)
        setAnimalDataGlobalFunction(userData.animalData as Array<AnimalInfoParams>)
        navigation.navigate('Home' as never, { haveAddress: true, isValid: true} as never);
      } else {
        navigation.navigate('Login' as any);
      }


    } catch (e: any) {
      //Verify error type by docs https://github.com/sunnylqm/react-native-storage
      navigation.navigate('Login' as any);
      return showError(
        'Error: ' + e,
        'Apparently there was an error, try again'
      );
    }
  };

  useEffect(() => {
    const getToken = async () => {
      getTokenFromLocalStorage();
    };

    getToken();
  }, []);

  return <></>;
}

export default SplashScreen;

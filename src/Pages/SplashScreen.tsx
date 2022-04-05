import React, { useContext, useEffect, useState } from 'react';
import storage from '../utils/storage';
import api from '../api/api';
import UserContext from '../contexts/user';
import AuthContext from '../contexts/auth';
import isEmpty from '../utils/isEmpty';
import NoWIFIModal from '../components/NoWIFIModal';
import VeterinariansContext from '../contexts/veterinarians';

import { useNavigation } from '@react-navigation/core';
import { UserData } from '../types/UserData';
import { AnimalDataWithArraykey } from '../types/AnimalData';
import { generateUrlSearchParams } from '../utils/URLSearchParams';
import { verifyNetwork } from '../utils/network';
import { showError } from '../utils/error';
import { hasNotificationsPermissions } from '../utils/notifications';
import { storeExpoToken } from '../services/auth';

function SplashScreen() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState<UserData>();

  const { setUser, setAnimalData } = useContext(UserContext);
  const { setVeterinarians } = useContext(VeterinariansContext);
  const { setToken, token } = useContext(AuthContext);

  const [internetConnection, setInternetConnection] = useState<boolean>(false);

  useEffect(() => {
    const getVeterinarians = async () => {
      try {
        const response = await api.get('/veterinarian/get');
        setVeterinarians(response.data);
      } catch (e) {
        showError('Error: ' + e, 'error getting vets');
      }
    };
    getVeterinarians();
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const response = await getTokenFromLocalStorage();

      if (!!response) {
        navigation.navigate('Home' as never, response as never);
      } else {
        navigation.navigate('Login' as any);
      }
    };

    getToken();
  }, []);

  //Check token on localstorage
  const getTokenFromLocalStorage = async () => {
    let accessResponse;
    try {
      accessResponse = await storage.load({ key: '@userAccess' }); //Try find access token on local storage
    } catch (e: any) {
      switch (e.name) {
        case 'NotFoundError':
          console.log('Not found');
          break;
        case 'ExpiredError':
          console.log('Expired');
          break;
      }
      return false;
    }

    const { salt, token } = accessResponse;

    if (!!salt && !!token) {
      //API request
      const tokenData = generateUrlSearchParams({ salt, token });

      try {
        const response = await api.post('/user/access/verify', tokenData);

        setUserData(response.data as unknown as UserData);
      } catch (e: any) {
        //Verify error type by docs https://github.com/sunnylqm/react-native-storage
        showError('Error: ' + e, 'Apparently there was an error, try again');

        return false;
      }
      if (userData) {
        setToken(userData?.token);
        setUser(userData as UserData);
        setAnimalData(userData.animalData as Array<AnimalDataWithArraykey>);

        const { userAddress } = userData;
        return { haveAddress: !isEmpty(userAddress) };
      }
    }

    return false;
  };


  //CHECK INTERNET
  const verifyNetworkLocal = () => {
    useEffect(() => {
      const verifyNetworkInsideUseEffect = async () => {
        const status = await verifyNetwork(); //Trigger function to verify if user have internet
        setInternetConnection(!status);
      };
      verifyNetworkInsideUseEffect();
    }, []);
  };

  return <>{internetConnection && <NoWIFIModal handleClick={verifyNetworkLocal} />}</>;
}

export default SplashScreen;

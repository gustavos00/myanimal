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

function SplashScreen() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState<UserData>();

  const { setUser, setAnimalData } = useContext(UserContext);
  const { setVeterinarians } = useContext(VeterinariansContext);
  const { setToken } = useContext(AuthContext);

  const [internetConnection, setInternetConnection] = useState<boolean>(false);

  const verifyNetworkLocal = () => {
    //Verifica se o cliente tem acesso a internet para evitar problemas nos requests.
    useEffect(() => {
      const verifyNetworkInsideUseEffect = async () => {
        const status = await verifyNetwork();
        setInternetConnection(!status);
      };
      verifyNetworkInsideUseEffect();
    }, []);
  };

  useEffect(() => {
    //Request GET para receber os dados dos veterinários
    const getVeterinarians = async () => {
      try {
        const response = await api.get('/veterinarian/get');
        setVeterinarians(response.data);
      } catch (e) {
        showError('Error: ' + e, 'Apparently there was an error, try again');
      }
    };
    getVeterinarians();
  }, []);

  useEffect(() => {
    //Chama a função getTokenFromLocalStorage dentro de um useEffect para que a função só seja chamada 1 vez.
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

  //Request ao Local Storage para procurar se o utilizador tem um token previamente guardado.
  const getTokenFromLocalStorage = async () => {
    let accessResponse;
    try {
      accessResponse = await storage.load({ key: '@userAccess' });
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
      const tokenData = generateUrlSearchParams({ salt, token });

      try {
        const response = await api.post('/user/access/verify', tokenData);
        setUserData(response.data as unknown as UserData);
      } catch (e: any) {
        showError('Error: ' + e, 'Apparently there was an error, try again');
        return false;
      }

      if (userData) {
        setToken(userData?.token);
        setUser(userData as UserData);
        setAnimalData(userData.animalData as Array<AnimalDataWithArraykey>);
        return { haveAddress: !isEmpty(userData.userAddress) };
      }
    }

    return false;
  };

  return (
    <>
      {internetConnection && <NoWIFIModal handleClick={verifyNetworkLocal} />}
    </>
  );
}

export default SplashScreen;

import React, { useContext, useEffect, useState } from 'react';
import storage from '../utils/storage';
import api from '../api/api';
import UserContext from '../contexts/user';
import AuthContext from '../contexts/auth';
import isEmpty from '../utils/isEmpty';
import NoWIFIModal from '../components/NoWIFIModal';

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

  const [accessResponse, setAccessResponse] = useState();
  const [userData, setUserData] = useState<UserData>();

  const { setUser, setAnimalData } = useContext(UserContext);
  const { setToken, token } = useContext(AuthContext);

  const [internetConnection, setInternetConnection] = useState<boolean>(false);

  //Check token on localstorage
  const getTokenFromLocalStorage = async () => {
    try {
      const response = await storage.load({ key: '@userAccess' }); //Try find access token on local storage
      setAccessResponse(response);
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

    if (!!accessResponse) {
      const { salt, token } = accessResponse;

      //API request
      const tokenData = generateUrlSearchParams({ salt, token });

      try {
        const response = await api.post('/user/access/verify', tokenData); //Make a request to API to verify access token
        setUserData(response.data as unknown as UserData);
      } catch (e: any) {
        //Verify error type by docs https://github.com/sunnylqm/react-native-storage
        showError('Error: ' + e, 'Apparently there was an error, try again');

        return false;
      }

      if (userData) { //If is valid, set data to context API
        setToken(userData?.token);
        setUser(userData as UserData);
        setAnimalData(userData.animalData as Array<AnimalDataWithArraykey>);

        const { userAddress } = userData;
        return { haveAddress: !isEmpty(userAddress) };
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    const getToken = async () => {
      const response = await getTokenFromLocalStorage(); //Trigger getTokenFromLS function

      if (!!response) {
        navigation.navigate('Home' as never, response as never);
      } else {
        navigation.navigate('Login' as any);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    const getNotificationsStatus = async () => { //Trigger function to detect if user allow notifications 
      const response = await hasNotificationsPermissions();
      if (!!response) {
        storeExpoToken({ expoToken: response, token: token ?? '' });
      }
    };
    getNotificationsStatus();
  }, []);

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

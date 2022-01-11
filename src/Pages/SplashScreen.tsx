import React, { useContext, useEffect, useState } from 'react';
import storage from '../utils/storage';
import api from '../api/api';
import UserContext from '../contexts/user';
import AuthContext from '../contexts/auth';
import isEmpty from '../utils/isEmpty';

import { useNavigation } from '@react-navigation/core';
import { UserData } from '../types/UserData';
import { AnimalData } from '../types/AnimalData';
import { generateUrlSearchParams } from '../utils/URLSearchParams';
import { verifyNetwork } from '../utils/network';
import { showError } from '../utils/error';
import { hasNotificationsPermissions } from '../utils/notifications';
import { storeExpoToken } from '../services/auth';

import BackgroundFilter from '../components/BackgroundFilter';
import BottomModal from '../components/BottomModal';
import NoWIFIModal from '../components/NoWIFIModal';

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
      const response = await storage.load({ key: '@userAccess' });
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
        setAnimalData(userData.animalData as Array<AnimalData>);
        const { userAddress } = userData;
        return { haveAddress: !isEmpty(userAddress) };
      }
    } else {
      return false;
    }
  };

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

  useEffect(() => {
    const getNotificationsStatus = async () => {
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
        const status = await verifyNetwork();
        setInternetConnection(!status);
      };
      verifyNetworkInsideUseEffect();
    }, []);
  };

  return (
    <>
      {internetConnection && (
        <BackgroundFilter>
          <BottomModal modalHeight={300}>
            <NoWIFIModal handleClick={verifyNetworkLocal} />
          </BottomModal>
        </BackgroundFilter>
      )}
    </>
  );
}

export default SplashScreen;

import React, { useContext, useEffect, useState } from 'react';
import storage from '../utils/storage';
import api from '../api/api';
import UserContext from '../contexts/user';
import AuthContext from '../contexts/auth';
import isEmpty from '../utils/isEmpty';

import { useNavigation } from '@react-navigation/core';
import { showError } from '../utils/error';
import { UserContextProps } from '../interfaces/UserContextData';
import { AnimalInfoParams } from '../interfaces/AnimalInfoParams';
import { generateUrlSearchParams } from '../utils/URLSearchParams';
import { verifyNetwork } from '../utils/network';

import { hasNotificationsPermissions } from '../utils/notifications';

import BackgroundFilter from '../components/BackgroundFilter';
import BottomModal from '../components/BottomModal';
import NoWIFIModal from '../components/NoWIFIModal';

function SplashScreen() {
  const navigation = useNavigation();

  const [accessResponse, setAccessResponse] = useState();
  const [userData, setUserData] = useState<UserContextProps>();

  const { setUser, setAnimalData } = useContext(UserContext);
  const { setToken, setExpoToken } = useContext(AuthContext);

  const [internetConnection, setInternetConnection] = useState<boolean>(false);

  //Check token on localstorage
  const getTokenFromLocalStorage = async () => {
    try {
      const response = await storage.load({ key: '@userAccess' });
      setAccessResponse(response);
    } catch (e) {
      //Handle error, expired, 404, etc...
      console.log(e);
      return false;
    }

    if (!!accessResponse) {
      const { salt, token } = accessResponse;

      //API request
      const tokenData = generateUrlSearchParams({ salt, token });

      try {
        const response = await api.post('/user/access/verify', tokenData);
        setUserData(response.data as unknown as UserContextProps);
      } catch (e: any) {
        //Verify error type by docs https://github.com/sunnylqm/react-native-storage
        showError('Error: ' + e, 'Apparently there was an error, try again');

        return false;
      }

      if (userData) {
        setToken(userData?.token);
        setUser(userData);
        setAnimalData(userData.animalData as Array<AnimalInfoParams>);
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
      !!response && setExpoToken(response);
      console.log(response);
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

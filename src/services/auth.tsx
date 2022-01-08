import { showError } from '../utils/error';
import { UserGoogleDataResponse } from '../interfaces/UserGoogleDataResponse';
import { generateFormData } from '../utils/FormData';

import api from '../api/api';
import Config from 'react-native-config';

import * as Google from 'expo-google-app-auth';

const uuid = require('uuid');

export async function GoogleSignIn() {
  const config = {
    iosClientId: Config.IOS_CLIENT_ID,
    androidClientId: Config.ANDROID_CLIENT_ID,
    scopes: ['profile', 'email'],
  };

  try {
    const data = await Google.logInAsync(config);

    if (data.type !== 'cancel') {
      const response = await storeUserData(data.user);
      return response;
    } else {
      return false;
    }
  } catch (e) {
    return showError('Error: ' + e, 'Apparently there was an error, try again');
  }
}

const storeUserData = async ({ givenName, familyName, email, photoUrl }: UserGoogleDataResponse) => {
  const salt = uuid.v4();

  const userData = generateFormData({ salt, givenName, familyName, email });
  userData.append('userPhoto', {
    uri: photoUrl,
    name: 'userPhoto',
    type: 'image/png',
  } as unknown as string);

  try {
    const response = await api.post('/user/create', userData);
    const { data, status } = JSON.parse(JSON.stringify(response));

    const tempObj = {
      ...data,
      status: status,
    };

    return tempObj;
  } catch (e) {
    return showError('Error: ' + e, 'Apparently there was an error, try again');
  }
};

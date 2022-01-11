import { useContext } from 'react';
import { showError } from '../utils/error';
import { UserGoogleData } from '../types/UserGoogleData';
import { generateFormData } from '../utils/FormData';

import api from '../api/api';

import * as Google from 'expo-google-app-auth';

const uuid = require('uuid');

interface storeExpoTokenProps {
  expoToken: string;
  token: string;
}

const storeUserData = async ({
  givenName,
  familyName,
  email,
  photoUrl,
}: UserGoogleData) => {
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

export const GoogleSignIn = async () => {
  const config = {
    iosClientId: '684156509987-mokd5cnud6oed8qn1r5nunqdu631friv.apps.googleusercontent.com',
    androidClientId: '684156509987-cprs1rm38pjgu7jt4i2hhan3mqppao1k.apps.googleusercontent.com',
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
};

export const storeExpoToken = async ({ expoToken, token }: storeExpoTokenProps) => {
  try {
    const expoTokenFormData = generateFormData({ expoToken, token });
    const response = await api.post('/user/expoToken', expoTokenFormData);
  } catch (e) {
    console.log(e);
  }
};

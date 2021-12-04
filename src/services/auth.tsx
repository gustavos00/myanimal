import { showError } from '../utils/error';
import { UserGoogleDataResponse } from '../interfaces/UserGoogleDataResponse';

import api from '../api/api';

import * as Google from 'expo-google-app-auth';

export async function GoogleSignIn() {
  const config = {
    iosClientId:
      '684156509987-mokd5cnud6oed8qn1r5nunqdu631friv.apps.googleusercontent.com',
    androidClientId:
      '684156509987-cprs1rm38pjgu7jt4i2hhan3mqppao1k.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  };

  try {
    const data = await Google.logInAsync(config);
    if (data.type === 'cancel') return false;

    const token = await apiPostData(data.user);
    return token;
  } catch (e) {
    showError('Error: ' + e, 'Apparently there was an error, try again');
  }
}

const apiPostData = async (params: UserGoogleDataResponse) => {
  let userData = new FormData();

  userData.append('givenName', params.givenName ?? '');
  userData.append('familyName', params.familyName ?? '');
  userData.append('email', params.email ?? '');
  userData.append('userPhoto', {
      uri: params.photoUrl,
      name: 'userPhoto',
      type: 'image/png', // or your mime type what you want
  } as unknown as string | Blob);

  try {
    const response = await api.post('/user/create', userData);
    const responseJSON = JSON.parse(JSON.stringify(response));

    return responseJSON.data;
  } catch (e) {
    showError('Error: ' + e, 'Apparently there was an error, try again');
  }
};

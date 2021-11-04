import React, { ReactNode } from 'react';
import api from '../api/api';

import * as Google from 'expo-google-app-auth';

import { setStorageItem } from '../utils/localStorage';

interface UserGoogleDataResponse {
  givenName?: string;
  familyName?: string;
  photoUrl?: string;
  email?: string;
}

export async function GoogleSignIn() {
  const config = {
    iosClientId: '684156509987-mokd5cnud6oed8qn1r5nunqdu631friv.apps.googleusercontent.com',
    androidClientId: '684156509987-cprs1rm38pjgu7jt4i2hhan3mqppao1k.apps.googleusercontent.com',
    scopes: ['profile', 'email']
  };

  try {
    const data = await Google.logInAsync(config)

    if(data.type === 'cancel') return;

    const token = await apiPostData(data.user)
    return token;
  } catch {
    console.log('Error #0102')
  }
}

const apiPostData = async({givenName, familyName, photoUrl, email} : UserGoogleDataResponse) => {
  const params = new URLSearchParams({
    givenName: givenName ?? "",
    familyName: familyName ?? "",
    photoUrl: photoUrl ?? "",
    email: email ?? "",
  })

  try {
    const response = await api.post('/user/create', params)
    const responseJSON = JSON.parse(JSON.stringify(response))
    await setStorageItem('token', responseJSON.data.token)


    return responseJSON.data
  } catch(e) {
    console.log(e)
  }
}

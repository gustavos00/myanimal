import React, { ReactNode } from 'react';
import api from '../api/api';

import * as Google from 'expo-google-app-auth';
import { Platform } from 'react-native';

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

    if(data.type === 'cancel') return false;

    const token = await apiPostData(data.user)
    return token;
  } catch {
    console.log('Error #0102')
  }
}

const apiPostData = async({givenName, familyName, photoUrl, email} : UserGoogleDataResponse) => {
  let userData = new FormData();

  userData.append('givenName', givenName ?? "")
  userData.append('familyName', familyName ?? "")
  userData.append('email', email ?? "")
  userData.append('file', {
    uri: photoUrl,
    name: 'profile',
    type: 'image/png' // or your mime type what you want
  } as any);

  try {
    const response = await api.post('/user/create', userData)
    const responseJSON = JSON.parse(JSON.stringify(response))
    
    return responseJSON.data
  } catch(e) {
    console.log(e)
  }
}

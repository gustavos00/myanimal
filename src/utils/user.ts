import api from '../api/api';
import { getStorageItem } from './localStorage';

export const getUserInformationFromAPI = async () => {
  let token = await getStorageItem('token')
      
  if(token !== null) {
    const data = await api.get(`/user/token/${token}/`)
    return data.data
  } else {
    console.log('Error #0901')
  }
}

export const getUserInformationFromLS = async () => {
  let token = await getStorageItem('token')
      
  if(token !== null) {
    const data = await api.get(`/user/token/${token}/`)
    return data.data
  } else {
    console.log('Error #0902')
  }
}
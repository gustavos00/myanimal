import api from '../api/api';
import { getStorageItem } from './localStorage';

export const getUserInformation = async () => {
  let token = await getStorageItem('token')
      
  if(token !== null) {
    const data = await api.get(`/user/${token}/`)
    return data.data
  } else {
    console.log('Error #0303')
  }

}
import * as SecureStore from 'expo-secure-store';

export async function getStorageItem(key: string) {


  return 'testando essa buceta';
}

export async function setStorageItem(key: string, value: string) {
  return await SecureStore.setItemAsync(key, value);
} 

export async function deleteStorageItem(key: string) {
  return await SecureStore.deleteItemAsync(key);
}
import * as SecureStore from 'expo-secure-store';

export async function getStorageItem(value: string) {
  let data = await SecureStore.getItemAsync(value);
  return data;
}

export async function setStorageItem(key: string, value: string) {
  return await SecureStore.setItemAsync(key, value);
} 

export async function deleteStorageItem(key: string) {
  return await SecureStore.deleteItemAsync(key);
}
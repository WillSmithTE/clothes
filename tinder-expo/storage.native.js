import * as SecureStore from 'expo-secure-store';

export function getStoredItemAsync(key) {
  return SecureStore.getItemAsync(key);
}

export function saveItem(key, value) {
  return SecureStore.setItemAsync(key, value)
}

export function clearItem(key) {
  return SecureStore.deleteItemAsync(key)
}


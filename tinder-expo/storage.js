import AsyncStorage from '@react-native-async-storage/async-storage';

export function getStoredItemAsync(key) {
  return AsyncStorage.getItem(key);
}

export function saveItem(key, value) {
  return AsyncStorage.setItem(key, value)
}

import AsyncStorage from '@react-native-community/async-storage';

export const STORE_OBJECTS = {
  USER: 'user'
};

export const storeObject = async (toStore, name) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(toStore));
  } catch (e) {
    console.log(`Storing ${name} failed`, e);
  }
};

export const getObject = async name => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(`Retrieving ${name} failed`, e);
  }
};

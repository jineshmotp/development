import { MMKV } from 'react-native-mmkv';

import { Storage } from 'redux-persist';

const storage = new MMKV();

function getMMKVItem<T>(key: string): T | null {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
}

function setMMKVItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

function removeMMKVItem(key: string) {
  storage.delete(key);
}

const MMKV_KEYS = {
  SHOW_ONBOARDING: 'showOnBoarding',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

const reduxStorage: Storage = {
  setItem: (key: string, value: string): Promise<boolean> => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string): Promise<string | undefined> => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string): Promise<void> => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export { storage, getMMKVItem, setMMKVItem, removeMMKVItem, MMKV_KEYS, reduxStorage };

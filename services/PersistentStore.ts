import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AsyncStore {
  constructor() {}

  set(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
  }

  delete(key: string) {
    return AsyncStorage.removeItem(key);
  }

  get(key: string) {
    return AsyncStorage.getItem(key);
  }
}

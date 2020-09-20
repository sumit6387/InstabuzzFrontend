import AsyncStorage from '@react-native-community/async-storage';

export const Storeindevice = async (value, name) => {
    try {
        await AsyncStorage.setItem(name, value)
        var check = true
    } catch (e) {
        var check = false
    }
    return check;
}

export const StoreObj = async (value, name) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(name, jsonValue)
        var check = true
    } catch (e) {
        var check = false
    }
    return check;
}

export const retrivedata = async (name) => {
    try {
      const value = await AsyncStorage.getItem(name)
      if(value !== null) {
        return value;
      }
    } catch(e) {
      // error reading value
      return e;
    }
  }

 export const retriveObjData = async (name) => {
    try {
      const jsonValue = await AsyncStorage.getItem(name)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      return e
    }
  }
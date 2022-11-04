import AsyncStorage from "@react-native-async-storage/async-storage";
import GoodString from "./GoodString";
import dateFormat, { masks } from "dateformat";

export const mobilevalidate = (text) => {
  const reg = /^[0]?[789]\d{9}$/;
  if (reg.test(text) === false) {

    return false;
  } else {

    return true;
  }
}

export const validateEmail = (text) => {

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    return false;
  }
  else {
    return true;
  }
}


export const getUser = () => {
  // Get the current 'global' time from an API using Promise
  return new Promise(async (resolve, reject) => {
    const userDetail = await AsyncStorage.getItem(GoodString.USER_PREF_KEY)
    userDetail ? resolve(JSON.parse(userDetail)) : reject(null);

  })
}

export const getVehicle = () => {
  // Get the current 'global' time from an API using Promise
  return new Promise(async (resolve, reject) => {
    const vehicle = await AsyncStorage.getItem(GoodString.VEHICLE_DETAIL_PREF_KRY)
    vehicle ? resolve(JSON.parse(vehicle)) : reject(null);

  })
}

export const getActivityPermission = () => {
  // Get the current 'global' time from an API using Promise
  return new Promise(async (resolve, reject) => {
    const vehicle = await AsyncStorage.getItem(GoodString.ACTIVITY_PERMISSION)
    vehicle ? resolve(vehicle) : reject(null);

  })
}

export const getLastScreen = () => {
  // Get the current 'global' time from an API using Promise
  return new Promise(async (resolve, reject) => {
    const screen = await AsyncStorage.getItem(GoodString.SCREEN_NAME)
    if (screen == null) {
      reject(null)
    } else {
      resolve(screen)
    }

  })
}

export const clearPrefereance =()=>{
   AsyncStorage.clear();
}

export const monthList = () => {
  var m_names = new Array("January", "February", "March",
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December");
  const current = new Date();
  const months = [];
  for (let index = 0; index <= 2; index++) {
    // current.setMonth(current.getMonth() - index);
    //  const totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const previousMonth = current.toLocaleString('MMM', { month: 'long' });
    months.push(m_names[current.getMonth() - index]);
  }

  return months.reverse()
}

export const fetchDate = (month) => {
  var m_names = new Array("January", "February", "March",
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December");

  let index = m_names.indexOf(month);
  const current = new Date();
  
  
   current.setMonth(index);
     const totalDays = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
    const previousMonth = current.toLocaleString('MMM', { month: 'long' });

    var dateRange={
      start_date : current.getFullYear()+'-'+ (current.getMonth()+1) +'-01',
      end_date : current.getFullYear()+'-'+(current.getMonth()+1) +'-'+totalDays
    }
 

  return dateRange;
}


export const timeSince = timeStamp => {
  var date = new Date(timeStamp);
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  if (Math.floor(seconds) >= 0 && Math.floor(seconds) <= 5) {
    return 'just now'
  } else { return Math.floor(seconds) + ' seconds ago'; }
};



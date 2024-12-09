import firebase from '@react-native-firebase/app';
// import authenticate from '@react-native-firebase/auth';

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: 'AIzaSyDhW_hFYbS22yPTgNQQKm3BeSzt5cE1fo8',
  // authDomain: 'nearluk-application-746c2.firebaseapp.com',
  projectId: 'nearluk-application-746c2',
  storageBucket: 'nearluk-application-746c2.appspot.com',
  messagingSenderId: '747300871983',
  appId: '1:747300871983:web:e9893cd568c5b88e670bda',
  measurementId: 'G-NPQ5SH4VJE',
};
if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}


const db = firebase.database();

export { db };

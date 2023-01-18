import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDrS8N3aDSnpcZttOIoeD0rYsdWjQYjKF4",
  authDomain: "crypto-react-app-a0aaa.firebaseapp.com",
  projectId: "crypto-react-app-a0aaa",
  storageBucket: "crypto-react-app-a0aaa.appspot.com",
  messagingSenderId: "116944378941",
  appId: "1:116944378941:web:b84df1630f9970360a9e54",
  measurementId: "G-K287PHSGJQ"
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
export const auth = getAuth()
export const disconnect = signOut
export const database = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);
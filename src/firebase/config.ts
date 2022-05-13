import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJdgt1NmeKwAXgja1K25_oascqn4-lS3Q",
  authDomain: "mymoney-f03ab.firebaseapp.com",
  projectId: "mymoney-f03ab",
  storageBucket: "mymoney-f03ab.appspot.com",
  messagingSenderId: "916171655314",
  appId: "1:916171655314:web:216c51a21edd44b2057e4b",
};

//initialize firebase
const app = initializeApp(firebaseConfig);

//intialize services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqBU82xRq7ILZRbQal41UTw33XbpNcK98",
  authDomain: "netflixgpt-a197a.firebaseapp.com",
  projectId: "netflixgpt-a197a",
  storageBucket: "netflixgpt-a197a.appspot.com",
  messagingSenderId: "519561994467",
  appId: "1:519561994467:web:2cbc284ed312b1453d25d6",
  measurementId: "G-K2S94TG5E0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
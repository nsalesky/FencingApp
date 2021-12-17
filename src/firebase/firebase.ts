import { getApps, initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLHxliel_gXcndQYSy4pFQDzK6stPA5Ew",
  authDomain: "fencingapp-16667.firebaseapp.com",
  projectId: "fencingapp-16667",
  storageBucket: "fencingapp-16667.appspot.com",
  messagingSenderId: "195163892116",
  appId: "1:195163892116:web:8774f65174314a4928c781",
  measurementId: "G-6M8T4V6XRJ",
};

const initializeFirebase = () => {
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
};

export default initializeFirebase;

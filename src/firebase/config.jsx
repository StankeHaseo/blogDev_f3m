import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCh0cU1K7KmzramuSmUaaRMYr9lB2ZC91Y",
  authDomain: "blogdev--gogeta.firebaseapp.com",
  projectId: "blogdev--gogeta",
  storageBucket: "blogdev--gogeta.appspot.com",
  messagingSenderId: "642008196852",
  appId: "1:642008196852:web:99e9100932c695f2d720a1",
  measurementId: "G-7TLX8B2S9K"
};


const googleProvider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


export {db, googleProvider}
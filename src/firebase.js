import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDoMzxwLtmcZAjIRm-RaasYnIUdjztaeXg",
    authDomain: "calendar-app-shared.firebaseapp.com",
    projectId: "calendar-app-shared",
    storageBucket: "calendar-app-shared.firebasestorage.app",
    messagingSenderId: "969326741604",
    appId: "1:969326741604:web:e456e0112bda9732f43771"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

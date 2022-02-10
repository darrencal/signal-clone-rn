import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBbP9MtjMU4GJCI2aUt6mTFRYA_OwLYTuY",
    authDomain: "dc-demos-65426.firebaseapp.com",
    projectId: "dc-demos-65426",
    storageBucket: "dc-demos-65426.appspot.com",
    messagingSenderId: "790501091392",
    appId: "1:790501091392:web:3378bb024be7232fa317a5",
    measurementId: "G-Z403MZ6N22"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };

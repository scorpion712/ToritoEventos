import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyBpWuomOJB_SQEhR9iRVv7V6Xg4bpSXays",
    authDomain: "torito-eventos.firebaseapep.com",
    projectId: "torito-eventos",
    storageBucket: "torito-eventos.appspot.com",
    messagingSenderId: "231678793585",
    appId: "1:231678793585:web:af3fa3c7ad9ea37f5bc8d0",
    measurementId: "G-GL583N3CVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage();

export { storage as storage, db as db };
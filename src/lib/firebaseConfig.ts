// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBhicrasW71Va9K79HbcS9BC3HXIE_OPk",
  authDomain: "moviecraze-84e21.firebaseapp.com",
  projectId: "moviecraze-84e21",
  storageBucket: "moviecraze-84e21.appspot.com",
  messagingSenderId: "110054301082",
  appId: "1:110054301082:web:3b5f9a06e38c3caab9ae23"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
export const storageRef = ref(storage, 'profile_images/${user.uid}');

export default firebase;
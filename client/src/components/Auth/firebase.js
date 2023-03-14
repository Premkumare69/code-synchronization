// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyCoiXoh_y552nW0LlLD8xRfayDDrcJVwZo",
  authDomain: "login-signup-app-123.firebaseapp.com",
  projectId: "login-signup-app-123",
  storageBucket: "login-signup-app-123.appspot.com",
  messagingSenderId: "623425987288",
  appId: "1:623425987288:web:9ec7f3e7ca989cfdc66dad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

export { app, auth };
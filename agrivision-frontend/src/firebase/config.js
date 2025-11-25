// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQbW83LPqnu3CPuXXdOdYXh6tROzL13j4",
  authDomain: "agriguard-4a7f7.firebaseapp.com",
  projectId: "agriguard-4a7f7",
  storageBucket: "agriguard-4a7f7.firebasestorage.app",
  messagingSenderId: "741679293378",
  appId: "1:741679293378:web:c52a48ed9c75a2dec3ec5b",
  measurementId: "G-DG1XWTG76R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
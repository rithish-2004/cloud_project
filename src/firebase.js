// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1Zcgnu2koZE1VbcYMHgDYx02tR4KRmHE",
  authDomain: "blog-b58cb.firebaseapp.com",
  projectId: "blog-b58cb",
  storageBucket: "blog-b58cb.appspot.com",
  messagingSenderId: "147749582803",
  appId: "1:147749582803:web:840d6cfd391c10790a6126",
  measurementId: "G-JZRRNHNVXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { db };

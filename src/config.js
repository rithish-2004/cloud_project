
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyD1Zcgnu2koZE1VbcYMHgDYx02tR4KRmHE",
    authDomain: "blog-b58cb.firebaseapp.com",
    projectId: "blog-b58cb",
    storageBucket: "blog-b58cb.appspot.com",
    messagingSenderId: "147749582803",
    appId: "1:147749582803:web:b1c650424fa3ea420a6126",
    measurementId: "G-ZPF93J2LRF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export { auth, provider };
import { initializeApp, getApp, getApps } from "firebase/app";
import  {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBitXoYtzy5ABswIfoE2JTqOZt61lht1Eg",
  authDomain: "interviewagent-1f879.firebaseapp.com",
  projectId: "interviewagent-1f879",
  storageBucket: "interviewagent-1f879.firebasestorage.app",
  messagingSenderId: "785886016634",
  appId: "1:785886016634:web:c534dd36e3fcdda34cb7c3",
  measurementId: "G-Z0NNSSM03D",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
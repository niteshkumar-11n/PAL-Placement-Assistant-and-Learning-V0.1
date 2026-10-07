
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-ba6ba-743b0.firebaseapp.com",
  projectId: "interviewiq-ba6ba-743b0",
  storageBucket: "interviewiq-ba6ba-743b0.firebasestorage.app",
  messagingSenderId: "526142679017",
  appId: "1:526142679017:web:ed61e22f79ae7a23b08d78",
  measurementId: "G-G4K3K5GMLL"
};

const hasFirebaseApiKey = Boolean(firebaseConfig.apiKey);
const app = hasFirebaseApiKey ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export { auth, provider, hasFirebaseApiKey };

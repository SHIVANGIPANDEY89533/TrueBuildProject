import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey:            "AIzaSyCLdMvCMQJCZxlyVbU90zVMIHEJWyMvmFc",
  authDomain:        "truebuild-863a2.firebaseapp.com",
  databaseURL:       "https://truebuild-863a2-default-rtdb.firebaseio.com/",
  projectId:         "truebuild-863a2",
  storageBucket:     "truebuild-863a2.firebasestorage.app",
  messagingSenderId: "175647604914",
  appId:             "1:175647604914:web:413e8cf2535dd71776c9ab",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
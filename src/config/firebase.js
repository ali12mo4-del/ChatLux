import { initializeApp } from 'firebase/app'; import { getAuth } from 'firebase/auth'; import 
{ getDatabase } from 'firebase/database'; const firebaseConfig = {
  apiKey: "ضع_apiKey_هنا", authDomain: "ضع_authDomain_هنا", databaseURL: 
  "ضع_databaseURL_هنا", projectId: "ضع_projectId_هنا", storageBucket: "ضع_storageBucket_هنا", 
  messagingSenderId: "ضع_messagingSenderId_هنا", appId: "ضع_appId_هنا"
};
const app = initializeApp(firebaseConfig); export const auth = getAuth(app);
export const database = getDatabase(app);

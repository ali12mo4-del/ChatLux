import { initializeApp } from 'firebase/app'; import { getAuth } from 'firebase/auth'; import 
{ getDatabase } from 'firebase/database'; const firebaseConfig = {
  apiKey: "AIzaSyDezcJ2nxcZuIUhEH1rafQoHVeG12r0qGI", authDomain: 
  "chatlux-eb685.firebaseapp.com", databaseURL: 
  "https://chatlux-eb685-default-rtdb.firebaseio.com", projectId: "chatlux-eb685", 
  storageBucket: "chatlux-eb685.firebasestorage.app", messagingSenderId: "748490671755", 
  appId: "1:748490671755:web:dac4ebb6e6c77c352a768e"
};
const app = initializeApp(firebaseConfig); export const auth = getAuth(app); export const 
database = getDatabase(app);
export default app;

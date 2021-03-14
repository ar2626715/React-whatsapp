import firebase from "firebase" ;
// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/8.3.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/8.3.0/firebase-analytics.js"></script>

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyA8vhiu2Doo9z_KYNOxkwGEwDiMARLlxVY",
     authDomain: "whatsapp-clone-b3e7a.firebaseapp.com",
     projectId: "whatsapp-clone-b3e7a",
     storageBucket: "whatsapp-clone-b3e7a.appspot.com",
     messagingSenderId: "1072462575640",
     appId: "1:1072462575640:web:5237fc799d4db4d6a0eb6d",
     measurementId: "G-SQJ7S7Z8P9"
   };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.
GoogleAuthProvider();

export {auth ,provider};
export default db;
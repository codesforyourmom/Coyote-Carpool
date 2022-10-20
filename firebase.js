// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import firestore from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4jJ9ueqJQ-Cf-CD1R-4wJuHmPhquew4I",
  authDomain: "coyote-carpool.firebaseapp.com",
  databaseURL: "https://coyote-carpool-default-rtdb.firebaseio.com",
  projectId: "coyote-carpool",
  storageBucket: "coyote-carpool.appspot.com",
  messagingSenderId: "644690513510",
  appId: "1:644690513510:web:6b3b6482de416abe82e7a7"
};

// Initialize Firebase

let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else {
    app = firebase.app()
}

firebase.firestore().settings({ experimentalForceLongPolling: true });
//firebase.initializeApp(firebaseConfig);
//firebase.firestore();
const auths = firebase.auth()

export { auths };
export default firebase;

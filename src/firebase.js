import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBfrntqfi5tVbyT_hT97WPkT1MXgcQ0e2o",
    authDomain: "coolsupersafespace.firebaseapp.com",
    projectId: "coolsupersafespace",
    storageBucket: "coolsupersafespace.appspot.com",
    messagingSenderId: "989205908042",
    appId: "1:989205908042:web:20d05c7ac4b61819e574b3",
    measurementId: "G-VC486VB4W0"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;


import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDyhwlOp45UYZ8vyuWjrXRoRIpFRlnrmvc",
  authDomain: "todo-app-cd311.firebaseapp.com",
  projectId: "todo-app-cd311",
  storageBucket: "todo-app-cd311.appspot.com",
  messagingSenderId: "830473498366",
  appId: "1:830473498366:web:b697a175e41205fded3faf",
  measurementId: "G-YHV5J9K9M1"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

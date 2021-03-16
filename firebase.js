import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCp487IxuH_fd9zFZ_8ZIudaiAMtMXvjRI',
  authDomain: 'signal-clone-2fb12.firebaseapp.com',
  projectId: 'signal-clone-2fb12',
  storageBucket: 'signal-clone-2fb12.appspot.com',
  messagingSenderId: '782713733230',
  appId: '1:782713733230:web:d66dc4a8cbecde28cc667f',
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = app.auth();

export { db, auth };

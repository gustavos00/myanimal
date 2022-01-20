import * as Firebase from 'firebase/app';
import * as Firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAExHUCAL26WOEhOBrUMKr2Pg6sZQul9jA',
  authDomain: 'myanimalchat.firebaseapp.com',
  projectId: 'myanimalchat',
  storageBucket: 'myanimalchat.appspot.com',
  messagingSenderId: '965498175126',
  appId: '1:965498175126:web:e5e41b03fe85f7bc5e0cb7',
  measurementId: 'G-2F6DNL3QPW',
};

if (Firebase.getApps().length === 0) {
  Firebase.initializeApp(firebaseConfig);
}

export const db = Firestore.getFirestore();
export const chatsRef = Firestore.collection(db, 'chats');

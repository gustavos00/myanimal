// @refresh reset
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import * as Firebase from 'firebase/app';
import * as Firestore from 'firebase/firestore';

import UserContext from '../contexts/user';
import Footer from '../components/Footer';

interface IMessages {
  _id: number;
  text: string;
  createdAt: any;
  user: any;
  fingerprint: string;
}

export default function Chat() {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState<Array<IMessages>>();

  const giftedUser = {
    _id: user?.id.toString() ?? '1',
    name: user?.givenName ?? 'Gustavo',
    avatar: user?.photoUrl ?? '',
  };

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

  const db = Firestore.getFirestore();
  const chatsRef = Firestore.collection(db, 'chats');

  useEffect(() => {
    const unsubscribe = Firestore.onSnapshot(chatsRef, (doc) => {
      const messages = [] as Array<IMessages>;
      const docArray = doc.docChanges();

      docArray.forEach(({ type, doc }) => {
        const message = doc.data() as IMessages;
        if (type === 'added' && message.createdAt) {
          messages.push({ ...message, createdAt: message.createdAt.toDate() });
        }
      });

      const newArray = messages.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });

      appendMessages(newArray);
    });

    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    },
    [messages]
  );

  async function handleSend(messages: any) {
    const writes = messages.map((m: object) => {
      Firestore.addDoc(chatsRef, { ...m });
    });

    await Promise.all(writes);
  }

  return (
    <>
      <View style={{ flex: 1, width: '100%', height: '100%', paddingBottom: 80 }}>
        <GiftedChat messages={messages} onSend={handleSend} user={giftedUser} />
      </View>
      <Footer wichActive={'settings'} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
  },
});

// .forEach(({ type, doc }) => {
//   if (type === 'added') {
//     const message = doc.data()
//     const data = { ...message, createdAt: message.createdAt.toDate()
//   }
// })

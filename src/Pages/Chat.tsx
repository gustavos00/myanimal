// @refresh reset
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';

import * as Firebase from 'firebase/app';
import * as Firestore from 'firebase/firestore';

import UserContext from '../contexts/user';
import Footer from '../components/Footer';
import storage from '../utils/storage';

interface IMessages {
  _id: number;
  text: string;
  createdAt: any;
  user: any;
  fingerprint: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Array<IMessages>>();
  let messagesFingerprint: string;

  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const { fromWho, toWhom } = route.params;

  const { user } = useContext(UserContext);

  //TODO -> REMOVE ?? '1' FROM ID AND PREVENT UNDEFINED ID
  //TODO -> REMOVE FIREBASE INIT
  const giftedUser = {
    _id: user?.id.toString() ?? '1',
    name: user?.givenName ?? 'User',
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
    const getFingerprint = async () => {
      const fingerprintKeyName = `${fromWho}-${toWhom}`;

      const res = await storage.load({ key: fingerprintKeyName });
      console.log('ls', res.fingerprint);
      messagesFingerprint = res.fingerprint as string;
      if (!res) return <> </>;
    };

    getFingerprint();
  }, []);


  useEffect(() => {
    const getMessages = async () => {
      const unsubscribe = await Firestore.onSnapshot(chatsRef, (doc) => {
        const messages = [] as Array<IMessages>;
        const docArray = doc.docChanges();

        docArray.forEach(({ type, doc }) => {
          const message = doc.data() as IMessages;

          
          if (message.fingerprint != messagesFingerprint) {
            // console.log('----');
            console.log('host ', message.fingerprint);
            console.log('local ' + messagesFingerprint);
            console.log('----');
          }

          if (type === 'added' && message.createdAt && message.fingerprint === '6k7kd') {
            messages.push({ ...message, createdAt: message.createdAt.toDate() });
          }
        });

        const newArray = messages.sort((a, b) => {
          return b.createdAt.getTime() - a.createdAt.getTime();
        });

        appendMessages(newArray);
        return () => unsubscribe();
      });
    };

    getMessages();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    },
    [messages]
  );

  async function handleSend(messages: any) {
    const writes = messages.map((m: object) => {
      Firestore.addDoc(chatsRef, { ...m, fingerprint: messagesFingerprint });
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

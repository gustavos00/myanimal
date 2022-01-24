// @refresh reset
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';

import { chatsRef } from '../services/fire';
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

  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const { friendData } = route.params;

  const { user } = useContext(UserContext);

  //TODO -> REMOVE ?? '1' FROM ID AND PREVENT UNDEFINED ID
  const giftedUser = {
    _id: user?.id.toString() ?? '1',
    name: user?.givenName ?? 'User',
    avatar: user?.photoUrl ?? '',
  };

  useEffect(() => {
    const getMessages = async () => {
      // TO DO -> Get device ID
      const unsubscribe = await Firestore.onSnapshot(chatsRef, (doc) => {
        const messages = [] as Array<IMessages>;
        const docArray = doc.docChanges();

        docArray.forEach(({ type, doc }) => {
          const message = doc.data() as IMessages;

          if (type === 'added' && message.createdAt && message.fingerprint === friendData.fingerprint) {
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
      Firestore.addDoc(chatsRef, { ...m, fingerprint: friendData.fingerprint  });
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

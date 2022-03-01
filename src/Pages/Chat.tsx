// @refresh reset
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';
import { showError } from '../utils/error';

import { chatsRef } from '../services/fire';
import { addDoc, where, onSnapshot, query, collection } from 'firebase/firestore';

import UserContext from '../contexts/user';
import Footer from '../components/Footer';

interface AllMessages {
  _id: number;
  text: string;
  createdAt: any;
  user: any;
  fingerprint: string;
}

interface GiftedUser {
  _id: string;
  name: string;
  avatar: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Array<AllMessages>>();
  const [giftedUser, setGiftedUser] = useState<GiftedUser>();

  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const { friendData, isVeterinarian } = route.params;

  const navigation = useNavigation();

  const { user } = useContext(UserContext);

  if (!user) {
    navigation.navigate('Friends' as never);
    return showError(
      'Error: getting user data on chat',
      'Apparently there was an error, try again'
    );
  }

  useEffect(() => {
    setGiftedUser({
      _id: user?.idUser.toString(), //To do -> To fix
      name: user?.givenName,
      avatar: user?.photoUrl,
    });
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      const q = query(chatsRef, where('fingerprint', '==', friendData.fingerprint));
      const unsubscribe = await onSnapshot(q, (doc) => {
        const messages = [] as Array<AllMessages>;
        const docArray = doc.docChanges();

        docArray.forEach(({ type, doc }) => {
          const message = doc.data() as AllMessages;
          messages.push({ ...message, createdAt: message.createdAt.toDate() });
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
      addDoc(chatsRef, { ...m, fingerprint: friendData.fingerprint });
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

import React, { useContext, useEffect, useState } from 'react';
import { showError } from '../utils/error';
import { FlatList, View } from 'react-native';
import { FriendsData } from '../types/FriendsData';

import UserContext from '../contexts/user';
import FriendsContext from '../contexts/friends';
import api from '../api/api';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import FriendsElement from '../components/FriendsElement';
import { useNavigation } from '@react-navigation/core';

interface TokenResponse {
  token: string;
}

function Friends() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>();

  const { user } = useContext(UserContext);
  const { handleAcceptedFriends, acceptedFriends } = useContext(FriendsContext);

  const getAllFriends = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/user/friends/getAccepted?id=${user?.id}`);

      handleAcceptedFriends(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }
  };

  const openChat = async (friendData: FriendsData) => {
    //TODO - CHECK IF TOKEN IS VALID BEFORE
    navigation.navigate('Chat' as never, { friendData } as never);
  };

  useEffect(() => {
    const getFriends = async () => {
      await getAllFriends();
    };

    getFriends();
  }, []);

  return (
    <>
      <Header text={'Wow, looking for friends?'} />

      <Background>
        <>
          <BackgroundHeader text={'Friends'} />

          <FlatList
            data={acceptedFriends}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View>
                  <FriendsElement
                    trueText={'Chat'}
                    falseText={'Remove'}
                    trueColor={'blue'}
                    falseColor={'red'}
                    trueFunction={() => openChat(item)}
                    falseFunction={() => console.log('a')}
                    friendsElementData={item}
                  />
                </View>
              );
            }}
          />
        </>
      </Background>

      <Footer wichActive={'settings'} />

      {loading && <Loading />}
    </>
  );
}

export default Friends;

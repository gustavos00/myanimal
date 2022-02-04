import React, { useContext, useEffect, useState } from 'react';
import { showError } from '../utils/error';
import { FlatList, View } from 'react-native';
import { FriendsData, OneFriendDataElementInterface } from '../types/FriendsData';
import { useNavigation } from '@react-navigation/core';

import UserContext from '../contexts/user';
import FriendsContext from '../contexts/friends';
import api from '../api/api';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import FriendsElement from '../components/FriendsElement';
import StatesContext from '../contexts/states';

function Friends() {
  const navigation = useNavigation();

  const { isLoading, setIsLoading } = useContext(StatesContext);
  const { user } = useContext(UserContext);
  const { setAcceptedFriends, acceptedFriends } = useContext(FriendsContext);

  const getAllFriends = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/user/friends/getAccepted?id=${user?.id}`);

      setAcceptedFriends(response.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }
  };

  const openChat = async (friendData: FriendsData) => {
    navigation.navigate('Chat' as never, { friendData } as never);
  };

  const deleteFriend = async(index: number) => {
    if (!acceptedFriends) return console.log('Pending friends dont exist');

    const tempAcceptedFriends = acceptedFriends;
    const idFriendsElement = tempAcceptedFriends[index].idfriends;

    try {
      setIsLoading(true);
      await api.get(`/user/friends/decline?id=${idFriendsElement}`);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }

    const acceptedFriendIndex = tempAcceptedFriends.findIndex(
      (element) => element.idfriends == idFriendsElement
    );
    tempAcceptedFriends.splice(acceptedFriendIndex, 1);
    setAcceptedFriends([...tempAcceptedFriends]);
  }

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
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <FriendsElement
                    trueText={'Chat'}
                    falseText={'Remove'}
                    trueFunction={() => openChat(item)}
                    falseFunction={() => deleteFriend(index)}
                    friendsElementData={item as OneFriendDataElementInterface}
                  />
                </View>
              );
            }}
          />
        </>
      </Background>

      <Footer wichActive={'settings'} />

      {isLoading && <Loading />}
    </>
  );
}

export default Friends;

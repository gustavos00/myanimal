import React, { useContext, useEffect, useState } from 'react';
import { showError } from '../utils/error';
import { FlatList, View } from 'react-native';
import { FriendsData } from '../types/FriendsData';
import { useNavigation } from '@react-navigation/core';
import { generateUrlSearchParams } from '../utils/URLSearchParams';

import UserContext from '../contexts/user';
import FriendsContext from '../contexts/friends';
import api from '../api/api';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import StatesContext from '../contexts/states';
import DataElement from '../components/DataElement';

function Friends() {
  const navigation = useNavigation();

  const { isLoading, setIsLoading } = useContext(StatesContext);
  const { user } = useContext(UserContext);
  const { setAcceptedFriends, acceptedFriends } = useContext(FriendsContext);

  const getAllFriends = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/user/friends/getAccepted?id=${user?.idUser}`);

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

  const deleteFriend = async (index: number) => {
    if (!acceptedFriends) return console.log('Pending friends dont exist');

    const tempAcceptedFriends = acceptedFriends;
    const idFriendsElement = tempAcceptedFriends[index].idfriends;

    try {
      setIsLoading(true);
      const deleteFriendData = generateUrlSearchParams({ id: idFriendsElement });
      await api.post(`/user/friends/decline`, deleteFriendData);
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
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View>
                <DataElement
                  haveSlider
                  photoUrl={item.friendData.photoUrl}
                  title={item.friendData.givenName}
                  subTitle={item.friendData.familyName}
                  sliderTrueText={'Chat'}
                  sliderFalseText={'Remove'}
                  sliderTrueFunction={() => openChat(item)}
                  sliderFalseFunction={() => deleteFriend(index)}
                />
              </View>
            )}
          />
        </>
      </Background>

      <Footer wichActive={'settings'} />

      {isLoading && <Loading />}
    </>
  );
}

export default Friends;

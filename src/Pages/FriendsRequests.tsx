import React, { useContext, useEffect, useState } from 'react';
import { showError } from '../utils/error';
import { FlatList, View } from 'react-native';

import UserContext from '../contexts/user';
import api from '../api/api';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import FriendRequestElement from '../components/FriendRequestElement';

function FriendsRequests() {
  const [loading, setLoading] = useState<boolean>();
  const [friendsRequests, setFriendsRequests] = useState();

  const { user } = useContext(UserContext);

  const getAllFriendsRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/user/friend/get?id=${user?.id}`);
      console.log(response.data);
      setFriendsRequests(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      return showError(
        'Error: ' + e,
        'Apparently there was an error, try again'
      );
    }
  };

  useEffect(() => {
    const getFriendsRequests = async () => {
      await getAllFriendsRequests();
    };

    getFriendsRequests();
  }, []);

  return (
    <>
      <Header text={'Wow, looking for friends?'} />

      <Background>
        <>
          <BackgroundHeader text={'Friends requests'} />

          <FlatList
            data={friendsRequests}
            renderItem={({ index, item }) => {
              return (
                <View key={item.idfriends}>
                  <FriendRequestElement key={item.idfriends} friendRequestData={item} />
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

export default FriendsRequests;

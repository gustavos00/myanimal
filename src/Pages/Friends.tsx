import React, { useContext, useEffect, useState } from 'react';
import { showError } from '../utils/error';
import { FlatList, View } from 'react-native';

import UserContext from '../contexts/user';
import FriendsContext from '../contexts/friends';
import api from '../api/api';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import FriendsElement from '../components/FriendsElement';

function Friends() {
  const [loading, setLoading] = useState<boolean>();

  const { user } = useContext(UserContext);
  const { handleAcceptedFriends, acceptedFriends } = useContext(FriendsContext);

  const getAllFriends = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/user/friends/getAccepted?id=${user?.id}`);
      console.log(response.data)

      handleAcceptedFriends(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }
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
          <BackgroundHeader text={'Friends requests'} />

          <FlatList
            data={acceptedFriends}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ index, item }) => {
              return (
                <View>
                  <FriendsElement friendsElementData={item} index={index} />
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

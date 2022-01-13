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

function FriendsRequests() {
  const [loading, setLoading] = useState<boolean>();

  const { user } = useContext(UserContext);
  const { handlePendingFriends, pendingFriends } = useContext(FriendsContext);

  const getAllFriendsRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/user/friends/getPending?id=${user?.id}`);
      handlePendingFriends(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      return showError('Error: ' + e, 'Apparently there was an error, try again');
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
            data={pendingFriends}
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

export default FriendsRequests;

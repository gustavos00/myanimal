import React, { useEffect, useState } from 'react';
import { showError } from '../utils/error';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';

import api from '../api/api';
import { FlatList, Text, View } from 'react-native';
import AnimalElement from '../components/AnimalElement';

function FriendsRequests() {
  const [loading, setLoading] = useState<boolean>();
  const [friendsRequests, setFriendsRequests] = useState();

  const getAllFriendsRequests = async () => {
    setLoading(true)
    try {
      const response = await api.get(`user/friend/get?id=1`);
      setFriendsRequests(response.data);
      setLoading(false)
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

    getAllFriendsRequests();
  }, []);

  return (
    <>
      <Header text={'Wow, looking for friends?'} />

      <Background>
        <>
          <BackgroundHeader text={'Friends requests'} />

          <FlatList
            data={friendsRequests}
            renderItem={({index, item}) => {
              console.log(index)
              console.log('----')
              return (
                <View key={index}>
                  <Text>{item.fromWho}</Text>
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

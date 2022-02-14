import React, { useContext, useEffect, useState } from 'react';
import { showError } from '../utils/error';
import { FlatList } from 'react-native';

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

function FriendsRequests() {
  const { user } = useContext(UserContext);
  const { isLoading, setIsLoading } = useContext(StatesContext);
  const { setPendingFriends, pendingFriends, acceptFriendsRequest, declineFriendsRequests } =
    useContext(FriendsContext);

  const getAllFriendsRequests = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/user/friends/getPending?id=${user?.id}`);
      setPendingFriends(response.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
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
            renderItem={({ index, item }) => (
              <DataElement
                haveSlider
                photoUrl={item.friendData.photoUrl}
                title={item.friendData.givenName}
                subTitle={item.friendData.familyName}
                sliderTrueText={'Accept'}
                sliderFalseText={'Delete'}
                sliderTrueFunction={() => acceptFriendsRequest(index)}
                sliderFalseFunction={() => declineFriendsRequests(index)}
              />
            )}
          />
        </>
      </Background>

      <Footer wichActive={'settings'} />

      {isLoading && <Loading />}
    </>
  );
}

export default FriendsRequests;

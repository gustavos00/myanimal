import React, { useEffect, useState } from 'react';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';

import api from '../api/api';

function FriendsRequests() {
  const [loading, setLoading] = useState<boolean>();

  const handleFriendsRequest = async() => {
    const response = await api.get('')
  }
  useEffect(() => {}, []);

  return (
    <>
      <Header text={'Wow, looking for friends?'} />

      <Background>
        <>
          <BackgroundHeader text={'Friends requests'} />
        </>
      </Background>

      <Footer wichActive={'settings'} />

      {loading && <Loading />}
    </>
  );
}

export default FriendsRequests;

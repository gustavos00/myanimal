import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/MainStack';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Settings() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Settings'>>();
  
  return (
    <>
      <Header name={params.name} image={params.photo}/>

      <Background>
        <>
          <BackgroundHeader text={'Settings'} />

        </>        
      </Background>

      <Footer />
    </>
  );
}

export default Settings;

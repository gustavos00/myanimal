import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Header from '../components/Header';
import { RootStackParamList } from '../navigator/MainStack';

function Settings() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Settings'>>();
  console.log(params.name)
  return (
    <>
      <Header name={params.name} image={params.photo}/>

      <Background>
        <>
          <BackgroundHeader text={'Your animals'} />

        
        </>        
      </Background>
    </>
  );
}

export default Settings;

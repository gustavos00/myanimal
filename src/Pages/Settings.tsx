import React from 'react';
import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Header from '../components/Header';

function Settings() {
  return (
    <>
      <Header name={'user?.givenname'} image={'user?.photo'}/>

      <Background>
        <>
          <BackgroundHeader text={'Your animals'} />

        
        </>        
      </Background>
    </>
  );
}

export default Settings;

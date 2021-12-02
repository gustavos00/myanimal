import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OptionHeader from '../components/OptionHeader';
import OptionElement from '../components/OptionElement';
import Underline from '../components/Underline';
import BottomModal from '../components/BottomModal';
import AuthContext from '../contexts/user';

function Settings() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const closeModal = () => {
    setSecutiryModalOpen(false);
  };

  const changeScreen = async (screenName: string, clearStorage?: boolean) => {
    navigation.navigate(screenName as any);

    if (clearStorage) {
      await SecureStore.deleteItemAsync('token');
    }
  };

  return (
    <>
      <Header name={user?.givenName} image={user?.imageUrl} />

      <Background>
        <>
          <BackgroundHeader text={'Settings'} />

          <View style={styles.textContainer}>
            <OptionHeader text={'Account Settings'} />
            <OptionElement
              handleClick={async () => changeScreen('Home')}
              text={'Edit profile'}
            />
            <OptionElement
              handleClick={() => setSecutiryModalOpen(true)}
              text={'Payment Methods'}
            />
            <OptionElement
              handleClick={() => setSecutiryModalOpen(true)}
              text={'Payment Historic'}
            />
            <OptionElement
              handleClick={async () => changeScreen('Login', true)}
              text={'Log-out'}
            />
          </View>

          <Underline />
          <View style={styles.textContainer}>
            <OptionHeader text={'Animal Settings'} />
            <OptionElement
              handleClick={async () => changeScreen('CreateAnimal')}
              text={'Create Animal'}
            />
            <OptionElement
              handleClick={async () => changeScreen('CreateAnimal')}
              text={'Find My Animal'}
            />
          </View>

          <Underline />
          <View style={styles.textContainer}>
            <OptionHeader text={'More'} />
            <OptionElement
              handleClick={() => changeScreen('Home')}
              text={'About us'}
            />
            <OptionElement
              handleClick={() => changeScreen('Home')}
              text={'Privacy Policy'}
            />
          </View>
        </>
      </Background>

      <Footer wichActive={'settings'} />
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 35,
    marginRight: 55,
    marginTop: 20,
  },
});

export default Settings;

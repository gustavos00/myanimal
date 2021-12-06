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
import StyledInput from '../components/StyledInput/index';
import Button from '../components/Button';
import Loading from '../components/Loading';

import api from '../api/api';

function Settings() {
  const [loading, setLoading] = useState<boolean>();
  const [trackNumber, setTrackNumber] = useState<string>();
  const [findMyAnimalModalIsOpen, setFindMyAnimalModalIsOpen] =
    useState<boolean>(false);

  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const changeScreen = async (screenName: string, clearStorage?: boolean) => {
    navigation.navigate(screenName as any);

    if (clearStorage) {
      await SecureStore.deleteItemAsync('token');
    }
  };

  const handleChangeText = (e: string) => {
    setTrackNumber(e);
  };

  const handleSubmitForm = async () => {
    setLoading(true);
    const { data } = await api.get(
      `/animal/findMyAnimal/?trackNumber=${trackNumber}`
    );

    if (data) {
      navigation.navigate(
        'FindMyAnimal' as never,
        {
          ownerContacts: data,
        } as never
      );
    }

    setLoading(false);
  };

  const swipeDownHandleFunction = () => {
    setFindMyAnimalModalIsOpen(false);
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
              handleClick={async () => setFindMyAnimalModalIsOpen(true)}
              text={'Find myAnimal'}
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

      {findMyAnimalModalIsOpen && (
        <>
          <BottomModal
            swipeDownFunction={swipeDownHandleFunction}
            modalHeight={250}
          >
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={{ width: '90%' }}>
                <StyledInput
                  placeholder={'Track number'}
                  handleChangeFunction={handleChangeText}
                />

                <Button
                  text={'Find owner animal'}
                  handleClick={handleSubmitForm}
                />
              </View>
            </View>
          </BottomModal>
        </>
      )}

      {loading && <Loading />}
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

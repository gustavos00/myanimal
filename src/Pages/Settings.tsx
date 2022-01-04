import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showError } from '../utils/error';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OptionHeader from '../components/OptionHeader';
import OptionElement from '../components/OptionElement';
import Underline from '../components/Underline';
import AuthContext from '../contexts/user';
import Loading from '../components/Loading';
import GenerateFriendQrContainer from '../components/GenerateFriendQRContainer';
import FindMyAnimalContainer from '../components/findMyAnimalContainer';

import storage from '../utils/storage';

function Settings() {
  const [loading, setLoading] = useState<boolean>();
  const [userEmail, setUserEmail] = useState<string>('');
  const [generateQRModalIsOpen, setGenerateQRModalIsOpen] =
    useState<boolean>(false);
  const [findMyAnimalModalIsOpen, setFindMyAnimalModalIsOpen] =
    useState<boolean>(false);

  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    } else {
      setUserEmail('');
      return showError(
        'Error getting user data',
        'Apparently there was a problem getting your email.'
      );
    }
  }, [user]);

  const userDataObj = {
    email: userEmail,
    id: user?.id,
  };

  const changeScreen = async (screenName: string, clearStorage?: boolean) => {
    navigation.navigate(screenName as any);

    if (clearStorage) {
      await storage.remove({ key: '@userAccess' });
    }
  };

  return (
    <>
      <Header />

      <Background>
        <>
          <BackgroundHeader text={'Settings'} />

          <View style={styles.textContainer}>
            <OptionHeader text={'Account Settings'} />
            <OptionElement
              handleClick={async () => changeScreen('UpdateProfile')}
              text={'Edit profile'}
            />
            <OptionElement
              handleClick={async () => changeScreen('Login', true)}
              text={'Log-out'}
            />
          </View>

          <Underline />
          <View style={styles.textContainer}>
            <OptionHeader text={'Friends'} />
            <OptionElement
              handleClick={async () => changeScreen('FriendsRequests')}
              text={'View friends requests'}
            />
            <OptionElement
              handleClick={async () => changeScreen('ScanQR')}
              text={'Add friends'}
            />
            <OptionElement
              handleClick={() => setGenerateQRModalIsOpen(true)}
              text={'Generate QR Code'}
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
              handleClick={() => changeScreen('AboutUs')}
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
        <FindMyAnimalContainer
          closeBottomModalFunction={setFindMyAnimalModalIsOpen}
          setLoadingFunction={setLoading}
        />
      )}

      {loading && <Loading />}

      {generateQRModalIsOpen && (
        <GenerateFriendQrContainer
          closeBottomModalFunction={setGenerateQRModalIsOpen}
          userData={userDataObj}
        />
      )}
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

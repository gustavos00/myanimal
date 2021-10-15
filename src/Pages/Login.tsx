import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import LottieView from 'lottie-react-native'

import * as Google from 'expo-google-app-auth';
import * as Network from 'expo-network';

import api from '../api/api';

import globalStyles from "../assets/styles/global";
import Button from "../components/Button/";
import RoundedBackground from "../components/RoundedBackground";
import SliderContent from "../components/SliderContent/";
import BackgroundFilter from "../components/BackgroundFilter";
import BottomModal from "../components/BottomModal";

interface userGoogleDataProps {
  givenName?: string;
  familyName?: string;
  photoUrl?: string;
  email?: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [internetConnection, setInternetConnection] = useState(true)
  const navigation = useNavigation();

  const verifyNetwork = () => {
    Network
    .getNetworkStateAsync()
    .then((res) => {
      res.isConnected ? setInternetConnection(false) : setInternetConnection(true)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  verifyNetwork()
  

  const apiPostData = ({givenName, familyName, photoUrl, email} : userGoogleDataProps) => {
    const params = new URLSearchParams({
      givenName: givenName ?? "",
      familyName: familyName ?? "",
      photoUrl: photoUrl ?? "",
      email: givenName ?? "",
    })

    api
      .post('/user', params)
      .then(({data, status}) => {
        console.log(status)
      })
  }

  const handleGoogleSignin = () => {
    const config = {
      iosClientId: '684156509987-mokd5cnud6oed8qn1r5nunqdu631friv.apps.googleusercontent.com',
      androidClientId: '684156509987-cprs1rm38pjgu7jt4i2hhan3mqppao1k.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    };

    Google
      .logInAsync(config)
      .then((data) => {
        if(data.type === 'cancel') return console.log('Canceled');

        setIsLoading(true);
        apiPostData(data.user);

        const handler = setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('Home' as any)
        }, 2000);
        return () => clearTimeout(handler);
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <> 

        <View style={styles.bg}>
        <RoundedBackground top> 
          <SliderContent 
            textBeforeBolder={"Imagine controlling your "} 
            textAfterBolder={" in one place?"} 
            textBolder={"pet's information"} 
            imageName={'bird'} 
            subheaderText={"On myAnimal you can control and share your pet's information quickly!"} 
            />
        </RoundedBackground>

        <View style={styles.buttonContainer}>
          <Button text={'Start with Google'} handleClick={handleGoogleSignin} />
        </View>
      </View>

      { internetConnection && 
        <BackgroundFilter >
          <BottomModal modalHeight={300}>
            <>
              <View style={styles.animationContainer}>
                <LottieView resizeMode={'center'} source={require('../assets/animations/noWifi.json')} autoPlay />
              </View>

              <Text style={styles.noWifiText}>Please check your internet connection and try again</Text>
              <TouchableOpacity onPress={verifyNetwork}>
                <Text style={styles.tryAgainText}>Try again.</Text>
              </TouchableOpacity>
            </>
          </BottomModal>
        </BackgroundFilter>
      }

    </>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,

    backgroundColor: globalStyles.mainColor
  },

  buttonContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },

  animationContainer: { 
    width: 100,
    height: 100,
    marginBottom: 10,

    alignItems: 'center'
  },

  noWifiText: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center'
  },

  tryAgainText: {
    marginTop: 10,

    opacity: .8,
    color: globalStyles.darkGray
  }
})

export default Login
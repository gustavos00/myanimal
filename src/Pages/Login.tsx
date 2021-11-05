import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from "react-native";
import { setStorageItem } from '../utils/localStorage';

import * as Network from 'expo-network';

import globalStyles from "../assets/styles/global";
import Button from "../components/LoginButton";
import RoundedBackground from "../components/RoundedBackground";
import SliderContent from "../components/SliderContent/";
import BackgroundFilter from "../components/BackgroundFilter";
import BottomModal from "../components/BottomModal";
import NoWIFIModal from "../components/NoWIFIModal";
import AuthContext from "../contexts/user";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [internetConnection, setInternetConnection] = useState(false)
  const navigation = useNavigation();

  const verifyNetwork = async() => {
    useEffect(() => {
        Network
          .getNetworkStateAsync()
          .then((response) => {
            response.isConnected ? setInternetConnection(false) : setInternetConnection(true)
          })
          .catch(() => {
            console.log("Error #0103")
          })
    }, [])
    

  }
  verifyNetwork()
  
  const { googleSignIn} = useContext(AuthContext);
  
  const handleGoogleSignIn = async() => {
    const status = await googleSignIn()
    
    if(status) {
      navigation.navigate('Home' as any)
    }
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
          <Button text={'Start with Google'} handleClick={handleGoogleSignIn} />
        </View>
      </View>

      { internetConnection && 
        <BackgroundFilter >
          <BottomModal modalHeight={300}>
            <NoWIFIModal handleClick={verifyNetwork}/>
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
})

export default Login
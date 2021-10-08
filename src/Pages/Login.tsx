import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Google from 'expo-google-app-auth';
import LoginWave from '../components/loginWave/index';
import LoginButton from '../components/LoginButton/index';

const Login = () => {
  const handleGoogleSignin = () => {
    const config = {
      iosClientId: '684156509987-mokd5cnud6oed8qn1r5nunqdu631friv.apps.googleusercontent.com',
      androidClientId: '684156509987-cprs1rm38pjgu7jt4i2hhan3mqppao1k.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    };

    Google
      .logInAsync(config)
      .then((data) => {
        if(data.type !== 'success') return console.log('Canceled');

        console.log(data.user)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <LoginWave />

      <View style={styles.buttonsContainer}>
       <LoginButton color={"#CE4232"} text={"Continue with Google"} imageName={"google"}/>
       <LoginButton color={"#3C66C4"} text={"Continue with Facebook"} imageName={"facebook"}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: '#CE4232',
  },

  facebookButton: {
    backgroundColor: '#3C66C4',
  },

  buttonsContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Login
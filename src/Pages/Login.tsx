import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Google from 'expo-google-app-auth';
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

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
      <View style={styles.background}>
        <LinearGradient 
          style={styles.gradient}
          colors={['#FFBB95', '#FFE1D0']}>
        </LinearGradient>
        <View style={{position: 'absolute', top: '80%', width: '100%', height: 200}}>
          <Svg
            height="60%"
            width="100%"
            viewBox="0 0 1440 320"
            >
            <Path
              fill="#FFE1D0"
              d="M0,0L26.7,53.3C53.3,107,107,213,160,218.7C213.3,224,267,128,320,122.7C373.3,117,427,203,480,245.3C533.3,288,587,288,640,288C693.3,288,747,288,800,277.3C853.3,267,907,245,960,202.7C1013.3,160,1067,96,1120,112C1173.3,128,1227,224,1280,234.7C1333.3,245,1387,171,1413,133.3L1440,96L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
            />
          </Svg>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleGoogleSignin()} activeOpacity={.7} style={[styles.button, styles.googleButton]}>
          <Image 
            style={styles.img}
            source={require('../assets/img/googleLogo.png')} />
          <Text style={styles.buttonText}>Use Google</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={.7} style={[styles.button, styles.facebookButton]}>
          <Image 
            style={styles.img}
            source={require('../assets/img/facebookLogo.png')} />
          <Text style={styles.buttonText}>Use Facebook</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    height: '65%',
    width: '100%',

    position: 'relative',
  },

  gradient: {
    height: '84%',

    justifyContent: 'center',
    alignItems: 'center'
  },

  img: {
    marginRight: 10, 
    
    width: 30,
    height: 30,
  }, 

  button: {
    width: 280,
    marginBottom: 15,
    marginTop: 15,
    
    paddingRight: 18,
    paddingLeft: 18,
    paddingTop: 15,
    paddingBottom: 15,

    borderRadius: 5,
    
    flexDirection: 'row',
    alignItems: 'center'
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

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
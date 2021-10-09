import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Header from "../components/Header";
import HomeSquare from "../components/HomeSquare";
import Footer from '../components/Footer/index';

const Login = () => {
  return (
    <>
      <Header 
        firstText={"Hello, "} 
        bolderText={"Gustavo! 👋"}
        secondText={"How your pet is doing?"} 
        imageUrl={"https://lh3.googleusercontent.com/a-/AOh14GhcN-ZXLHX6aO1C4T9DjrBlsxpH641s9B8s9Y-4SQ=s96-c"} 
      />

      <View style={styles.content}>
        <View style={styles.row}>
          <HomeSquare imageName={' '} value={''}/>
          <HomeSquare imageName={' '} value={''}/>
        </View>

        <View style={styles.row}>
          <HomeSquare imageName={' '} value={''}/>
          <HomeSquare imageName={' '} value={''}/>
        </View>
      </View>

      <Footer />
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: 80,
  },

  row: {
    width: '100%',
    marginTop: 30,
    marginBottom: 30,

    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

export default Login
import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Header from "../components/Header";
import HomeSquare from "../components/HomeSquare";
import Footer from '../components/Footer/index';

const Login = () => {
  return (
    <>
      <Header firstText={"Hello, Gustavo! 👋"} secondText={"How your pet is doing?"} />

      <View style={styles.content}>
        <View style={styles.row}>
          <HomeSquare />
          <HomeSquare />
        </View>

        <View style={styles.row}>
          <HomeSquare />
          <HomeSquare />
        </View>
      </View>

      <Footer />
    </>
  )
}

const styles = StyleSheet.create({


  content: {
    marginTop: 100,

    backgroundColor: 'red',
    borderWidth: 1,
  },

  row: {
    width: '100%',
    marginTop: 30,
    marginBottom: 30,

    flexDirection: 'row',
    justifyContent: 'space-around',

    borderWidth: 1,
    borderColor: 'purple'
  },


})

export default Login
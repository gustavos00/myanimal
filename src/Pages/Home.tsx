import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import LottieView from 'lottie-react-native'

import api from '../api/api';
import globalStyles from "../assets/styles/global";

interface userGoogleDataProps {

}

const Login = () => {
  return (
    <>
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
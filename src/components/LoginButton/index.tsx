import React from 'react';
import FastImage from 'react-native-fast-image';
import globalStyles from '../../assets/styles/global';

import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface LoginButtonProps {
  text: string;
  handleClick: () => void;
}

function LoginButton({ text, handleClick }: LoginButtonProps) {
  return (
    <>
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleClick}>
        <FastImage style={styles.buttonPhoto} source={require('../../assets/img/googleLogo.png')} />
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 279,
    height: 51,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: globalStyles.white,
    borderRadius: 15,
  },

  buttonText: {
    marginLeft: 18,

    fontWeight: 'bold',
    fontSize: 24,

    color: globalStyles.mainColor,
  },

  buttonPhoto: {
    width: 27,
    height: 27,
  },
});

export default LoginButton;

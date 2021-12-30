import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface LoginButtonProps {
  text: string,
  handleClick: () => void
}

function LoginButton({text, handleClick} : LoginButtonProps) {
  return (
    <>
      <TouchableOpacity activeOpacity={.7} style={styles.button} onPress={handleClick}>
        <Image style={styles.buttonPhoto} source={require('../../assets/img/googleLogo.png')}/>
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

    color: globalStyles.mainColor
  },

  buttonPhoto: {
    width: 27,
    height: 27,
  }
})


export default LoginButton;

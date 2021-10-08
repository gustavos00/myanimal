import React from "react";
import { TouchableOpacity, StyleSheet, Image, Text } from 'react-native'

interface LoginButtonProps {
  color: string, 
  text: string, 
  imageName: string,
  handleOnClick: () => void;
}

function LoginButton({color, text, imageName, handleOnClick} : LoginButtonProps) {
  let image

  switch(imageName) {
    case 'facebook':
      image = require('../../assets/img/facebookLogo.png')
      break;

    case 'google':
      image = require('../../assets/img/googleLogo.png')
      break; 
    default:
      console.log('Error finding loginButton image')
  }

  return (
    <>
      <TouchableOpacity onPress={() => handleOnClick()} activeOpacity={.7} style={[styles.button, {backgroundColor: color}]}>
          <Image 
            style={styles.img}
            source={image} />
          <Text style={styles.buttonText}>{ text }</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  img: {
    marginRight: 10, 
    
    width: 30,
    height: 30,
  }, 

  button: {
    width: 300,
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
});

export default LoginButton;

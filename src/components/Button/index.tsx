import React, { ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface ButtonProps {
  text: string,
  handleClick: () => void
}

function Button({ text, handleClick }: ButtonProps) {
  return (
    <>
      <TouchableOpacity activeOpacity={.7} onPress={handleClick} style={styles.btn}>
        <Text style={styles.btnText}>{text}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 280,
    height: 50,
    marginTop: 20,
    marginBottom: 20,
  
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: globalStyles.mainColor,
    borderRadius: 35
  },

  btnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalStyles.white
  }
})


export default Button;

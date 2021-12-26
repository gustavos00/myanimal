import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface CircleAddButtonProps {
  handleClick: () => void;
}

function CircleAddButton({ handleClick }: CircleAddButtonProps) {
  return (
    <>
      <TouchableOpacity activeOpacity={.7} style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50, 

    borderWidth: 3,
    borderColor: globalStyles.mainColor,
    borderRadius: 50,
    
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    width: 50,

    fontSize: 35,
    fontWeight: '400',
    color: globalStyles.mainColor,
    textAlign: 'center',
  }
})

export default CircleAddButton;

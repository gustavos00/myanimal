import React, { ReactNode } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface OptionElementProps {
  text: string,
  handleClick: () => void
}

function OptionElement({ text, handleClick }: OptionElementProps) {
  return (
    <>
      <TouchableOpacity onPress={handleClick}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 5,

    opacity: .9,

    fontSize: 18,
    color: globalStyles.black
  }
})

export default OptionElement;

import React, { ReactNode } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface SettingsElementProps {
  text: string,
  handleClick: () => void
}

function SettingsElement({ text, handleClick }: SettingsElementProps) {
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
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,

    fontSize: 16,
    color: globalStyles.black
  }
})

export default SettingsElement;

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface SettingsHeaderProps {
  text: string;
}

function SettingsHeader({ text }: SettingsHeaderProps) {
  return (
    <>
      <Text style={styles.text}>{text}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 10,
    
    fontSize: 20,
    color: globalStyles.darkGray,

    opacity: .5,
  }
})

export default SettingsHeader;

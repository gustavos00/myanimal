import React from 'react';
import { Text, StyleSheet } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface OptionHeaderProps {
  text: string;
}

function OptionHeader({ text }: OptionHeaderProps) {
  return (
    <>
      <Text style={styles.text}>{text}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 10,
    
    fontSize: 18,
    fontWeight: '500',
    color: globalStyles.mainColor,

    opacity: 1,
  }
})

export default OptionHeader;

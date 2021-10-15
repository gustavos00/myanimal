import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import globalStyles from '../../assets/styles/global';

interface HeaderTextProps {
  mainText: string,
  secondText: string,
}

function HeaderText({ mainText, secondText }: HeaderTextProps) {
  return (
    <>
      <Text style={styles.mainText}>{mainText}</Text>
      <Text style={styles.secondText}>{secondText}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  mainText: {
    color: globalStyles.white,
    lineHeight: 35,
    fontWeight: 'bold',
    fontSize: 24,
  },

  secondText: {
    fontSize: 16,
    color: globalStyles.white,
  }
})

export default HeaderText;

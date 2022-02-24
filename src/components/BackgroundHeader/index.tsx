import React from 'react';
import globalStyles from '../../assets/styles/global';
import Underline from '../Underline';

import { Text, StyleSheet, View } from 'react-native';

interface BackgroundHeaderProps {
  text: string;
}

function BackgroundHeader({ text }: BackgroundHeaderProps) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>{text}</Text>
      </View>

      <Underline />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 28,
    paddingRight: 28,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,

    color: globalStyles.black,
  },
});

export default BackgroundHeader;

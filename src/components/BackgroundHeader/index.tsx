import React from 'react';
import { Text, StyleSheet} from 'react-native';

import globalStyles from '../../assets/styles/global';
import Underline from '../Underline';

interface BackgroundHeaderProps {
  text: string
}

function BackgroundHeader({ text }: BackgroundHeaderProps) {
  return (
    <>
      <Text style={styles.header}>{text}</Text>
      <Underline />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginLeft: 50,

    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,

    color: globalStyles.black
  },
})

export default BackgroundHeader;

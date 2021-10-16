import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import globalStyles from '../../assets/styles/global';

interface BackgroundHeaderProps {
  text: string
}

function BackgroundHeader({ text }: BackgroundHeaderProps) {
  return (
    <>
      <Text style={styles.header}>{text}</Text>
      <View style={styles.underLine}></View>
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

  underLine: {
    width: '100%',
    height: 1,
    marginTop: 16,

    backgroundColor: globalStyles.lightGray
  }
})

export default BackgroundHeader;

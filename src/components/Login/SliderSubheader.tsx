import React from 'react';
import { Text, StyleSheet } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface SliderSubheaderProps {
  text: string
}

function SliderSubheader({text} : SliderSubheaderProps) {
  return (
    <>
      <Text style={styles.text}> 
        {text}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    width: '85%',

    fontSize: 18,
    lineHeight: 23,
    color: globalStyles.darkGray
  },
})

export default SliderSubheader;

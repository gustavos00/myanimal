import React from 'react';
import { Text, StyleSheet } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface SliderHeaderProps {
  textBeforeBolder: string;
  textBolder?: string
  textAfterBolder?:string
}

function SliderHeader({ textBeforeBolder, textBolder, textAfterBolder }: SliderHeaderProps) {
  return (
    <>
      <Text style={styles.text}> 
        {textBeforeBolder}
        <Text style={styles.bolder}> 
          {textBolder}
        </Text>
        {textAfterBolder}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    width: '85%',

    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 35,
    color: globalStyles.black
  }, 

  bolder: {
    color: globalStyles.mainColor
  }
})

export default SliderHeader;

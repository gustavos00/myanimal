import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import globalStyles from '../../assets/styles/global';

import SliderAllDots from '../SliderAllDots';
import SliderHeader from '../SliderHeader';
import SliderSubheader from '../SliderSubheader';


interface SliderContentProps {
  textBeforeBolder: string;
  textBolder?: string
  textAfterBolder?:string

  subheaderText: string

  imageName: string
}

function SliderContent({ textBeforeBolder, textBolder, textAfterBolder, imageName, subheaderText }: SliderContentProps) {
  let image

  switch (imageName) {
    case 'bird':
      image = require('../../assets/img/slideBird.png')
      break;
  
    default:
      console.log('Error getting slider content image')
      break;
  }
  return (
    <>
      <View style={styles.sliderContainer}>
        <SafeAreaView />

        <Image style={styles.sliderImage} source={image} />

        <SliderHeader textBeforeBolder={textBeforeBolder} textBolder={textBolder} textAfterBolder={textAfterBolder}/>
        <SliderSubheader text={subheaderText} />

        <SliderAllDots amount={5} wichActive={2} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,

    backgroundColor: globalStyles.mainColor
  },

  buttonContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },

  sliderImage: {
    width: 370,
    height: 370,
    marginBottom: 30,
  },

  sliderContainer: {
    alignItems: 'center'
  },
})

export default SliderContent;

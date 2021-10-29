import React from 'react';
import { View, StyleSheet, Image, SafeAreaView, Animated, ImageSourcePropType, Dimensions } from "react-native";

import DATA from '../../sliderData';

import SliderDot from '../SliderDot';
import SliderHeader from '../SliderHeader';
import SliderSubheader from '../SliderSubheader';

interface SliderContentProps {
  textBeforeBolder: string;
  textBolder?: string
  textAfterBolder?:string

  subheaderText?: string

  imageName: string
}

function SliderContent({ textBeforeBolder, textBolder, textAfterBolder, imageName, subheaderText }: SliderContentProps) {
  let image: ImageSourcePropType
  const { width } = Dimensions.get('screen');
  const scrollX = React.useRef(new Animated.Value(0)).current

  return (
    <>
      <Animated.FlatList 
        data={DATA} 
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: { x: scrollX }}}],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {

          switch (item.image) {
            case 'bird':
              image = require('../../assets/img/slideBird.png')
              break;
          
            case 'rabbit':
              image = require('../../assets/img/slideRabbit.png')
              break;

            case 'fish':
              image = require('../../assets/img/slideFish.png')
              break;

            case 'animal':
              image = require('../../assets/img/slideAnimal.png')
              break;

            default:
              console.log('Error getting slider content image')
              break;
          }

          return( 
            <View style={styles.sliderContainer}>
              <SafeAreaView />
              <View style={{marginLeft: 20, marginRight: 20}}>
                <Image style={styles.sliderImage} source={image} />

                <SliderHeader textBeforeBolder={item.textBeforeBolder} textBolder={item.textBolder} textAfterBolder={item.textAfterBolder}/>
                <SliderSubheader text={item.subHeader} />
              </View>
              
            </View>
          )
        }}
      />

      <View style={styles.dotsContainer}>
        <SliderDot scrollX={scrollX} amount={DATA.length} width={width} />
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: 350,
    height: 350,

    marginBottom: 30,
  },

  sliderContainer: {
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },

  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SliderContent;

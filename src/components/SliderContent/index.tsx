import React from 'react';
import { View, StyleSheet, Image, SafeAreaView, Animated, ImageSourcePropType, Dimensions } from "react-native";
import globalStyles from '../../assets/styles/global';
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

const DATA = [
  {
    "key": "1",
    "textBeforeBolder": "Imagine controlling your ",
    "textBolder": "pet's information",
    "textAfterBolder": " in one place?",
    "subHeader": "On myAnimal you can control and share your pet's information quickly!",
    "image": "rabbit"
  },
  {
    "key": "2",
    "textBeforeBolder": "Imagine controlling your ",
    "textBolder": "pet's information",
    "textAfterBolder": " in one place?",
    "subHeader": "On myAnimal you can control and share your pet's information quickly!",
    "image": "bird"
  },
  {
    "key": "3",
    "textBeforeBolder": "Imagine controlling your ",
    "textBolder": "pet's information",
    "textAfterBolder": " in one place?",
    "subHeader": "On myAnimal you can control and share your pet's information quickly!",
    "image": "https://image.flaticon.com/icons/png/256/3571/3571572.png"
  },
  {
    "key": "4",
    "textBeforeBolder": "Imagine controlling your ",
    "textBolder": "pet's information",
    "textAfterBolder": " in one place?",
    "subHeader": "On myAnimal you can control and share your pet's information quickly!",
    "image": "https://image.flaticon.com/icons/png/256/3571/3571572.png"
  },
]

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
            default:
              console.log('Error getting slider content image')
              break;
          }

          return( 
            <View style={styles.sliderContainer}>
              <SafeAreaView />
              <View style={{marginLeft: 18, borderWidth: 1 ,}}>
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
    alignItems: 'center'
  },

  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SliderContent;

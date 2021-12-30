import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Animated,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';

import DATA from '../../sliderData';

import SliderDot from '../SliderDot';
import SliderHeader from '../SliderHeader';
import SliderSubheader from '../SliderSubheader';

interface SliderContentProps {
  textBeforeBolder: string;
  textBolder?: string;
  textAfterBolder?: string;

  subheaderText?: string;

  photoName: string;
}

function SliderContent({
  textBeforeBolder,
  textBolder,
  textAfterBolder,
  photoName,
  subheaderText,
}: SliderContentProps) {
  let photoLocal: ImageSourcePropType;
  const { width } = Dimensions.get('screen');
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          switch (item.image) {
            case 'bird':
              photoName = require('../../assets/img/slideBird.png');
              break;

            case 'rabbit':
              photoName = require('../../assets/img/slideRabbit.png');
              break;

            case 'fish':
              photoName = require('../../assets/img/slideFish.png');
              break;

            case 'animal':
              photoName = require('../../assets/img/slideAnimal.png');
              break;

            default:
              console.log('Error getting slider content photo');
              break;
          }

          return (
            <View style={styles.sliderContainer}>
              <SafeAreaView />
              <View style={{ marginLeft: 20, marginRight: 20 }}>
                <Image style={styles.sliderPhoto} source={photoLocal} />

                <SliderHeader
                  textBeforeBolder={item.textBeforeBolder}
                  textBolder={item.textBolder}
                  textAfterBolder={item.textAfterBolder}
                />
                <SliderSubheader text={item.subHeader} />
              </View>
            </View>
          );
        }}
      />

      <View style={styles.dotsContainer}>
        <SliderDot scrollX={scrollX} amount={DATA.length} width={width} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sliderPhoto: {
    width: 350,
    height: 350,

    marginBottom: 30,
  },

  sliderContainer: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },

  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SliderContent;

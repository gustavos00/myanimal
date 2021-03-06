import React from 'react';
import sliderData from '../../sliderData';
import SliderDot from '../SliderDot';
import SliderHeader from '../SliderHeader';
import SliderSubheader from '../SliderSubheader';
import globalStyles from '../../assets/styles/global';

import { View, StyleSheet, SafeAreaView, Animated, Dimensions, Image, ImageSourcePropType } from 'react-native';

interface SliderContentProps {
  textBeforeBolder: string;
  textBolder?: string;
  textAfterBolder?: string;

  subheaderText?: string;

  photoLocal: string;
}

function SliderContent() {
  let photoLocal: ImageSourcePropType;
  const { width } = Dimensions.get('screen');
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <Animated.FlatList
        data={sliderData}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          switch (item.image) {
            case 'bird':
              photoLocal = require('../../assets/img/slideBird.png');
              break;

            case 'rabbit':
              photoLocal = require('../../assets/img/slideRabbit.png');
              break;

            case 'fish':
              photoLocal = require('../../assets/img/slideFish.png');
              break;

            case 'animal':
              photoLocal = require('../../assets/img/slideAnimal.png');
              break;

            default:
              console.log('Error getting slider content photo');
              break;
          }

          return (
            <View style={styles.sliderContainer}>
              <SafeAreaView />
              <View style={styles.sliderContent}>
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
        <SliderDot scrollX={scrollX} amount={sliderData.length} width={width} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sliderPhoto: {
    width: globalStyles.almostTheFullDeviceWidth,
    height: globalStyles.almostTheFullDeviceHeight * 0.45,

    marginBottom: globalStyles.smallerGap,
  },

  sliderContent: {
    width: globalStyles.fullDeviceWidth,
    height: globalStyles.fullDeviceWidth,

    justifyContent: 'center',
    alignItems: 'center',
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

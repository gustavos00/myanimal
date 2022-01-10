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

import sliderData from '../../sliderData';
import SliderDot from '../SliderDot';
import SliderHeader from '../SliderHeader';
import SliderSubheader from '../SliderSubheader';

import globalStyles from '../../assets/styles/global'

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
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
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
    width: globalStyles.fullDeviceWidth,
    height: globalStyles.fullDeviceHeight * .45,

    marginBottom: 30,
  },

  sliderContent: {
    marginHorizontal: Dimensions.get('window').width / 100,
    borderWidth: 1,
    
  },

  sliderContainer: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    borderWidth: 1,
  },

  dotsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SliderContent;

import React from 'react';
import { View, StyleSheet, Animated} from 'react-native';

import globalStyles from '../../assets/styles/global';

interface SliderDotProps {
  scrollX: any,
  amount: number,
  width: number,
}

function SliderDot({ scrollX, amount, width }: SliderDotProps) {
  const dots = [];

  for (let i = 0; i < amount; i++) {
    const inputRange = [(i - 1) * width, i * width, (i + 1) * width] //Previus slide | current slide | next slide
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [.8, 1.4, .8],
      extrapolate: 'clamp'
    })

    dots.push(
      <Animated.View 
        key={`indicator-${i}`}
        style={[styles.dot, {transform: [{scale}] } ]}
      ></Animated.View>
    )
    
  }
  return (
    <>
      <View style={styles.dotsContainer}>
        {dots}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    
    position: 'absolute',
    bottom: 30,
  },

  dot: {
    width: 10,
    height: 10,
    marginLeft: 3,
    marginRight: 3,

    opacity: .2,

    backgroundColor: globalStyles.black,
    borderRadius: 9
  }
})

export default SliderDot;

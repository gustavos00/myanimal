import React from 'react';
import { View, StyleSheet} from 'react-native';

import globalStyles from '../../assets/styles/global';

interface SliderDotProps {
  active?: boolean;
}

function SliderDot({ active }: SliderDotProps) {
  return (
    <>
      <View style={[styles.dot, active && styles.activeDot]}></View>
    </>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 13,
    height: 13,
    marginLeft: 3,
    marginRight: 3,

    backgroundColor: globalStyles.lightGray,
    borderRadius: 9
  },

  activeDot: {
    backgroundColor: globalStyles.mainColor,
  }
})

export default SliderDot;

import React from 'react';
import { View, StyleSheet} from 'react-native';
import SliderDot from '../SliderDot';

interface SliderAllDotsProps {
  amount: number;
  wichActive: number
}

function SliderAllDots({ amount, wichActive }: SliderAllDotsProps) {
  const dots = [];

  for (let i = 0; i < amount; i++) {
    let activeStatus = wichActive === i ? true : false
    dots.push(<SliderDot active={activeStatus} key={i}/>)
  }
  
  return (
    <>
      <View style={styles.dotContainer}>
        {dots}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    width: '85%',
    marginTop: 10,

    flexDirection: 'row'
  }
})

export default SliderAllDots;

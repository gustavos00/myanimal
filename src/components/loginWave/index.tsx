import React from "react";
import Svg, { Path } from "react-native-svg";
import { View, StyleSheet } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";

function LoginWave() {
  return (
    <>
      <View style={styles.background}>
        <LinearGradient 
          style={styles.gradient}
          colors={['#FFBB95', '#FFE1D0']}>
        </LinearGradient>
        <View style={{position: 'absolute', top: '80%', width: '100%', height: 200}}>
          <Svg
            height="60%"
            width="100%"
            viewBox="0 0 1440 320"
            >
            <Path
              fill="#FFE1D0"
              d="M0,0L26.7,53.3C53.3,107,107,213,160,218.7C213.3,224,267,128,320,122.7C373.3,117,427,203,480,245.3C533.3,288,587,288,640,288C693.3,288,747,288,800,277.3C853.3,267,907,245,960,202.7C1013.3,160,1067,96,1120,112C1173.3,128,1227,224,1280,234.7C1333.3,245,1387,171,1413,133.3L1440,96L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
            />
          </Svg>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '65%',
    width: '100%',

    position: 'relative',
  },

  gradient: {
    height: '84%',

    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default LoginWave;

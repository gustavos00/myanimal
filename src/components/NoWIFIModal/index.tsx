import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native'

import LottieView from 'lottie-react-native'
import BackgroundFilter from '../BackgroundFilter';
import BottomModal from '../BottomModal';

import globalStyles from '../../assets/styles/global';

interface NoWIFIModalProps {
  handleClick: () => void
}

function NoWifiModal({handleClick} : NoWIFIModalProps) {
  return (
    <>
        <BackgroundFilter >
          <BottomModal modalHeight={300}>
            <>
              <View style={styles.animationContainer}>
                <LottieView resizeMode={'center'} source={require('../../assets/animations/noWifi.json')} autoPlay />
              </View>

              <Text style={styles.noWifiText}>Please check your internet connection and try again</Text>
              <TouchableOpacity onPress={handleClick}>
                <Text style={styles.tryAgainText}>Try again.</Text>
              </TouchableOpacity>
            </>
          </BottomModal>
        </BackgroundFilter>
    </>
  );
}

const styles = StyleSheet.create({
  animationContainer: { 
    width: 100,
    height: 100,
    marginBottom: 10,

    alignItems: 'center'
  },

  noWifiText: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center'
  },

  tryAgainText: {
    marginTop: 10,

    opacity: .8,
    color: globalStyles.darkGray
  }
})

export default NoWifiModal;

import React, { ReactNode } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';

import globalStyles from '../../assets/styles/global';
import BackgroundFilter from '../BackgroundFilter';

interface BottomModalProps {
  children: ReactNode;
  modalHeight: number
  swipeDownFunction?: () => void
}

function BottomModal({ children, modalHeight, swipeDownFunction }: BottomModalProps) {
  return (
    <>
      <BackgroundFilter handlePress={swipeDownFunction}>
        <GestureRecognizer onSwipeDown={swipeDownFunction} style={[styles.modal, {height: modalHeight}]}>
          <View style={styles.topBar}></View>
          {children}
        </GestureRecognizer>
      </BackgroundFilter>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: '100%',

    alignItems: 'center',

    position: 'absolute',
    bottom: 0,

    backgroundColor: globalStyles.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  topBar: {
    width: 90,
    height: 5,
    marginTop: 10,
    marginBottom: 20,

    backgroundColor: globalStyles.darkGray,
    borderRadius: 100,
  }
})

export default BottomModal;

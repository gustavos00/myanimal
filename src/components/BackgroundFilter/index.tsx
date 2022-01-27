import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface BackgroundFilterProps {
  children: ReactNode;
  handlePress?: () => void;
}

function BackgroundFilter({ children, handlePress }: BackgroundFilterProps) {
  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.filter}>{children}</View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  filter: {
    width: globalStyles.fullDeviceWidth,
    height: globalStyles.fullDeviceHeight,

    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default BackgroundFilter;

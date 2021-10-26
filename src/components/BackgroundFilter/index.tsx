import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface BackgroundFilterProps {
  children: ReactNode;
  handlePress?: () => void
}

function BackgroundFilter({ children, handlePress }: BackgroundFilterProps) {
  return (
    <>
      <TouchableWithoutFeedback style={{width: '100%', height: '100%'}}onPress={handlePress}  >
        <View style={styles.filter}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  filter: {
    width: '100%',
    height: '100%',

    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    
    backgroundColor: "rgba(0,0,0,.5)"
  }
})

export default BackgroundFilter;

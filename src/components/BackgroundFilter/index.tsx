import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface BackgroundFilterProps {
  children: ReactNode;
  handlePress?: () => void
}

function BackgroundFilter({ children, handlePress }: BackgroundFilterProps) {
  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}  >
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
    
    backgroundColor: "rgba(0,0,0,.5)"
  }
})

export default BackgroundFilter;

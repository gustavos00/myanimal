import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface BackgroundFilterProps {
  children: ReactNode;
}

function BackgroundFilter({ children }: BackgroundFilterProps) {
  return (
    <>
      <View style={styles.filter}>
        {children}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  filter: {
    width: '100%',
    height: '100%',

    position: 'absolute',
    
    backgroundColor: "rgba(0, 0, 0, .5)"
  }
})

export default BackgroundFilter;

import React, { ReactNode } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

interface ScrollProps {
  children: ReactNode;
}

function Scroll({ children }: ScrollProps) {
  return (
    <ScrollView style={ styles.container }>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 100
  },
});

export default Scroll;

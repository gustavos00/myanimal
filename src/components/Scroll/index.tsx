import React, { ReactNode } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

interface ScrollProps {
  children: ReactNode;
  aligned?: boolean
}

function Scroll({ children, aligned }: ScrollProps) {
  return (
    <ScrollView
      contentContainerStyle={aligned && { justifyContent: 'center', alignItems: 'center' }}
      style={styles.container}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    marginBottom: 100,
  },
});

export default Scroll;

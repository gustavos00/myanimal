import React, { ReactNode } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface ScrollProps {
  children: ReactNode;
  aligned?: boolean;
  withoutMargin?: boolean;
}

function Scroll({ children, aligned, withoutMargin }: ScrollProps) {
  3;
  return (
    <ScrollView
      contentContainerStyle={aligned && { justifyContent: 'center', alignItems: 'center' }}
      style={[
        styles.container,
        !withoutMargin && { marginBottom: 100 }, //footer height
      ]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
});

export default Scroll;

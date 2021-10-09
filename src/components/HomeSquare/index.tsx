import React from "react";
import { View, StyleSheet } from "react-native";


function HomeSquare() {
  return (
    <>
      <View style={styles.square}>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 150,
    height: 150,

    backgroundColor: 'green',
  }
})

export default HomeSquare;

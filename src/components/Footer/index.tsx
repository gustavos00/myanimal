import React from "react";
import { View, StyleSheet } from "react-native";

function Footer() {
  return (
    <>
      <View style={styles.footer}>
        <View style={styles.button}></View>

        <View style={styles.middleButtonContainer}>
          <View style={styles.middleButton}>

          </View>
        </View>

        <View style={styles.button}></View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 126,
    paddingTop: 40, 

    position: 'absolute',
    bottom: 0,

    flexDirection: 'row',
    justifyContent: 'space-around',
    
    borderWidth: 1,
    borderColor: 'blue',
  },

  button: {
    width: 40,
    height: 40,
    
    backgroundColor: 'red',
  }, 

  middleButtonContainer: {
    width: 40,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',

    position: 'relative',

    borderWidth: 1,
  },

  middleButton: {
    width: 60,
    height: 60,
    
    backgroundColor: 'yellow',
    borderRadius: 10,

    position: 'absolute',
    top: -30,
  },
})

export default Footer;

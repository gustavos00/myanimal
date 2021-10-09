import React from "react";
import { View, StyleSheet } from "react-native";

import FooterWave from "../FooterWave";

function Footer() {
  return (
    <>
      <View style={styles.footerContainer}>    
        <FooterWave />

        <View style={styles.footer}>
          <View style={styles.button}></View>

          <View style={styles.middleButtonContainer}>
            <View style={styles.middleButton}>
              <View style={styles.button}></View>
            </View>
          </View>

          <View style={styles.button}></View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',

    position: 'absolute',
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    width: '100%',
    height: 85,

    flexDirection: 'row',
    justifyContent: 'space-around',

    backgroundColor: '#FFE1D0',
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
  },

  middleButton: {
    width: 60,
    height: 60,
    
    backgroundColor: '#E29756',
    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    top: -30,
  },
})

export default Footer;

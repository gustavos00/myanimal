import React from "react";
import { View, StyleSheet } from "react-native";

interface HomeSquareProps {
  imageName: string,
  value: string
}

function HomeSquare({imageName, value} : HomeSquareProps) {
  let image

  // switch(imageName) {
  //   case 'blackPawPrint':
  //     image = require('')
  //     break;

  //   case 'calendar':
  //     image = require('')
  //     break;

  //   case 'vaccine':
  //     image = require('')
  //     break;

  //   case 'hospital':
  //     image = require('')
  //     break;
      
  //   default:
  //     console.log('Not found image on HomeSquareButton component')
  //     break;
  // }

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

    backgroundColor: 'rgba(255,225,208,.5)',
    borderRadius: 7,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  }
})

export default HomeSquare;

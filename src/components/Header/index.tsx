import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import HeaderWave from '../HeaderWave/index';

interface HeaderProps {
  firstText: string,
  secondText: string
}


function Header({firstText, secondText} : HeaderProps) {
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
            <View style={styles.headerText}>
              <Text>{firstText}</Text>
              <Text>{secondText}</Text>
            </View>

            <View style={styles.userImage}></View>
        </View>

        <HeaderWave />

        <View style={styles.dataAnimalContainer}>
          <View style={styles.arrowImage}></View>

          <View style={styles.dataAnimal}>

          </View>

          <View style={styles.arrowImage}></View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative'
  },

  header: {
    height: 150,
    paddingTop: 50,

    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: '#FFE1D0'
  },

  headerText: {
    justifyContent: "center",

    borderWidth: 1,
    borderColor: 'green',
  },

  userImage: {
    width: 60,
    height: 60, 

    borderWidth: 1,
    borderColor: 'yellow',

    backgroundColor: 'red',
    borderRadius: 50,
  },

  dataAnimalContainer: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    position: 'absolute',
    top: 185,

    borderWidth: 1,
    borderColor: 'green',
  },

  dataAnimal: {
    width: 250,
    height: 80,

    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 7,
  },

  arrowImage: {
    width: 30,
    height: 30,
    
    backgroundColor: 'red',
  },
})


export default Header;

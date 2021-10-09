import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AnimalData from '../AnimalData';
import HeaderWave from '../HeaderWave/index';
import UserIcon from '../UserIcon/index';

interface HeaderProps {
  firstText?: string,
  bolderText?: string
  secondText: string,

  imageUrl: string,
}


function Header({firstText, bolderText, secondText, imageUrl} : HeaderProps) {
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.firstText} >{firstText} <Text style={styles.bolderText}>{bolderText}</Text></Text>
              <Text style={styles.secondText}>{secondText}</Text>
            </View>

           <UserIcon imageUrl={imageUrl}/>
        </View>

        <AnimalData />
        <HeaderWave />        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative'
  },

  header: {
    height: 130,
    paddingTop: 50,

    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: '#FFE1D0'
  },

  headerText: {
    justifyContent: "center",
  },

  firstText: {
    fontSize: 24,
    fontWeight: '200',
  },

  bolderText: {
    fontWeight: 'bold'
  },

  secondText: {
    fontSize: 20,
    fontWeight: '200',
  },
})


export default Header;

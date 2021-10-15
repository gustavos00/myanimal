import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'

import globalStyles from '../../assets/styles/global';
import HeaderIcon from '../HeaderIcon';
import HeaderText from '../HeaderText';

interface HeaderProps {
  
}

function Header({ }) {
  return (
    <>
      <View style={styles.header}>
        <View>
          <HeaderText 
            mainText={'Hello, Gustavo 👋'} 
            secondText={'Where is your animal?'}/>
        </View>

        <HeaderIcon photoUrl={''} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 220,

    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',

    backgroundColor: globalStyles.mainColor
  }
})

export default Header;
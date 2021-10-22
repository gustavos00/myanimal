import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../../assets/styles/global';
import FooterElement from '../FooterElement/index';

function Footer() {
  const navigation = useNavigation();

  const goToSettings = () => {
    navigation.navigate('Settings' as any, {
      name: 'Gustavo',
      image: ''
    });
  }
  const goToHome = () => {
    navigation.navigate('Home' as any);
  }  
  
  return (
    <>
      <View style={styles.footer}>
        <FooterElement handleClick={goToSettings} imageName={'setting'} />
        <FooterElement handleClick={goToHome} imageName={'home'} active />
        <FooterElement handleClick={goToSettings} imageName={'notification'} />
        <FooterElement handleClick={goToSettings} imageName={'user'} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 90,
    paddingBottom: 10,

    position: 'absolute',
    bottom: 0,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: globalStyles.white,
  },
})

export default Footer;

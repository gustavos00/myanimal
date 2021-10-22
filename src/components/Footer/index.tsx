import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import globalStyles from '../../assets/styles/global';
import FooterElement from '../FooterElement/index';

function Footer() {
  
  return (
    <>
      <View style={styles.footer}>
        <FooterElement imageName={'setting'} />
        <FooterElement active imageName={'home'} />
        <FooterElement imageName={'notification'} />
        <FooterElement imageName={'user'} />
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

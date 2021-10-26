import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../../assets/styles/global';
import FooterElement from '../FooterElement/index';

interface FooterProps {
  name?: string | undefined,
  photo?: string | undefined
  wichActive: string
}

function Footer({name, photo, wichActive} : FooterProps) {
  const navigation = useNavigation();

  const goToSettings = () => {
    if(typeof(name) === undefined || typeof(photo) === undefined) {
      console.log('#0501')
    }

    navigation.navigate('Settings' as never, {
      name,
      photo
    } as never);
  } 

  const goToHome = () => {
    navigation.navigate('Home' as any);
  }  
  
  return (
    <>
      <View style={styles.footer}>
        <FooterElement handleClick={goToSettings} imageName={'setting'} active={wichActive === 'settings' ? true : false} />
        <FooterElement handleClick={goToHome} imageName={'home'} active={wichActive === 'home' ? true : false} />
        <FooterElement handleClick={goToSettings} imageName={'notification'} active={wichActive === 'notification' ? true : false} />
        <FooterElement handleClick={goToSettings} imageName={'user'} active={wichActive === 'user' ? true : false} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 90,
    paddingBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.13,
    shadowRadius: 10,

    position: 'absolute',
    bottom: 0,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: globalStyles.white,
  },
})

export default Footer;

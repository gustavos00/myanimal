import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../../assets/styles/global';
import FooterElement from '../FooterElement/index';

interface FooterProps {
  wichActive: string;
}

function Footer({ wichActive }: FooterProps) {
  const navigation = useNavigation();

  const changeScreen = (name: string, haveFakeObject?: boolean) => {
    return haveFakeObject
      ? navigation.navigate(name as never, {} as never)
      : navigation.navigate(name as any);
  };

  return (
    <>
      <View style={styles.footer}>
        <FooterElement
          handleClick={() => changeScreen('Settings')}
          photoName={'setting'}
          active={wichActive === 'settings' ? true : false}
        />
        <FooterElement
          handleClick={() => changeScreen('Home', true)}
          photoName={'home'}
          active={wichActive === 'home' ? true : false}
        />
        <FooterElement
          handleClick={() => changeScreen('ViewProfile')}
          photoName={'user'}
          active={wichActive === 'user' ? true : false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: globalStyles.smallerGap * 5,
    paddingBottom: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 20,

    position: 'absolute',
    bottom: 0,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: globalStyles.white,
  },
});

export default Footer;

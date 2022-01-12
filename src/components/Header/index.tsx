import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import globalStyles from '../../assets/styles/global';
import UserContext from '../../contexts/user';
import HeaderIcon from '../HeaderIcon';
import HeaderText from '../HeaderText';

interface HeaderProps {
  text?: string;
}

function Header({ text }: HeaderProps) {
  const { user } = useContext(UserContext);

  return (
    <>
      <View style={styles.header}>
        <View>
          <HeaderText
            mainText={`Hello, ${user?.givenName} 👋`}
            secondText={text ? text : 'Where is your pet?'}
          />
        </View>

        <HeaderIcon photoUrl={user?.photoUrl} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: globalStyles.fullDeviceHeight * .25,

    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',

    backgroundColor: globalStyles.mainColor,
  },
});

export default Header;

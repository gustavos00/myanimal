import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import globalStyles from '../../assets/styles/global';
import AuthContext from '../../contexts/user';
import HeaderIcon from '../HeaderIcon';
import HeaderText from '../HeaderText';

interface HeaderProps {
  text?: string;
}

function Header({ text }: HeaderProps) {
  const { user } = useContext(AuthContext);

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
    height: 220,

    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',

    backgroundColor: globalStyles.mainColor,
  },
});

export default Header;

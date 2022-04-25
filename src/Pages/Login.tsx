import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';

import globalStyles from '../assets/styles/global';
import Button from '../components/LoginButton';
import RoundedBackground from '../components/RoundedBackground';
import SliderContent from '../components/SliderContent';
import AuthContext from '../contexts/auth';
import Loading from '../components/Loading';
import StatesContext from '../contexts/states';

const Login = () => {
  const navigation = useNavigation();

  const { isLoading, setIsLoading } = useContext(StatesContext);
  const { googleSignIn } = useContext(AuthContext);

  //Função que irá ser executa ao clicar no botão.
  //Executa a função da AuthContext chamada "googleSignIn"
  const handleGoogleSignIn = async () => {
    const status = await googleSignIn();

    setIsLoading(false)
    if (status) {
      const { haveAddress } = status;
      navigation.navigate(
        'Home' as never,
        {
          haveAddress,
        } as never
      );
    } else {
      console.log('Google auth canceled ');
    }
  };

  return (
    <>
      <View style={styles.bg}>
        <RoundedBackground top>
          <SliderContent />
        </RoundedBackground>

        <View style={styles.buttonContainer}>
          <Button text={'Start with Google'} handleClick={handleGoogleSignIn} />
        </View>
      </View>

      {isLoading && <Loading />}
    </>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,

    backgroundColor: globalStyles.mainColor,
  },

  buttonContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;

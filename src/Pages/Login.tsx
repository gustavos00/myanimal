import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';

import globalStyles from '../assets/styles/global';
import Button from '../components/LoginButton';
import RoundedBackground from '../components/RoundedBackground';
import SliderContent from '../components/SliderContent';
import AuthContext from '../contexts/auth';
import Loading from '../components/Loading';

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { googleSignIn } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const status = await googleSignIn();
    setLoading(false);

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

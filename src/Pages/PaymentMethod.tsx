import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import Background from '../components/Background';
import BackgroundHeader from '../components/BackgroundHeader';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PaymentMethodsInformation from '../components/PaymentMethodsInformation';
import OptionHeader from '../components/OptionHeader';
import Underline from '../components/Underline';
import AuthContext from '../contexts/user';

function PaymentMethod() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header name={user?.givenname} image={user?.photourl}/>

      <Background>
        <BackgroundHeader text={'Payment methods'}/>

        <PaymentMethodsInformation />

        <Underline />
        <View style={styles.container}>
          <OptionHeader text={'Valid Payment Methods'}/>
        </View>
        
      </Background>

      <Footer wichActive={'settings'} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  }
})

export default PaymentMethod;

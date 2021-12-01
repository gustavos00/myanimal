import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import AddPaymentMethodButton from '../AddPaymentMethodButton';

interface PaymentMethodsInformationProps {
  handleClickFunctionParams: (state : boolean) => void
}

function PaymentMethodsInformation({handleClickFunctionParams} : PaymentMethodsInformationProps) {
  return (
    <>
      <View style={styles.container}>
        <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        pagingEnabled
        scrollEventThrottle={32} 
        contentContainerStyle={styles.scroll} 
        >
          <AddPaymentMethodButton handleClickFunction={() => handleClickFunctionParams(true)}/>

          <View style={styles.cc}>

          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,

    justifyContent: 'center'
  },

  cc: {
    width: 260,
    height: 180,
    marginLeft: 30,
    marginRight: 30,

    borderRadius: 15,
    backgroundColor: 'red',
  },

  scroll: {
    alignItems: 'center'
  }
})

export default PaymentMethodsInformation;

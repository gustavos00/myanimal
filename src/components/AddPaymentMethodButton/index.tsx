import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface AddPaymentMethodButtonProps {
  handleClickFunction: () => void;
}

function AddPaymentMethodButton({ handleClickFunction }: AddPaymentMethodButtonProps) {
  return (
    <>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 77,
    height: 180,
    marginLeft: 30,

    borderRadius: 15,
    borderWidth: 2,
    borderColor: globalStyles.mainColor,

    shadowColor: globalStyles.mainColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: .7,
    shadowRadius: 4,

    alignItems: 'center',
    justifyContent: 'center'
  },


  plusText: {
    fontSize: 40,
    fontWeight: '200',
    color: globalStyles.mainColor
  }
})

export default AddPaymentMethodButton;

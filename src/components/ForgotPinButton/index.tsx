import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import globalStyles from '../../assets/styles/global';

function ForgotPinButton() {
  return (
    <>
      <TouchableOpacity style={styles.buttonContainer} >
        <Text style={styles.buttonText}>Forgot your pin?</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,

    alignItems: 'center',
  },

  buttonText: {
    color: globalStyles.gray
  }
})

export default ForgotPinButton;

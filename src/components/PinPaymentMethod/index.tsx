import React from 'react';
import { View, StyleSheet,  } from 'react-native';
import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper';


interface animalData {
  age: string,
  chipnumber: string,
  id: string,
  name: string,
  photourl: string,
  race: string,
  userid: string,
}

interface userData {
  id: string,
  givenname: string,
  lastname: string,
  photo: string,
  email: string
  animalData: Array<animalData>,
}

function PinPaymentMethod() {


  return (
    <>
      <KeyboardAvoidingWrapper >
        <>
          <View style={styles.dotInputContainer}>
        
          </View>
        </>
      </KeyboardAvoidingWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 55,
    marginRight: 55,
    marginTop: 20,
  },

  dotInputContainer: {
    flexDirection: 'row',
  }
})

export default PinPaymentMethod;

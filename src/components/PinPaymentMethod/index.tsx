import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getStorageItem } from '../../utils/localStorage';
import { getUserInformation } from '../../utils/user';

import DotInputNumeric from '../DotInputNumeric';
import ForgotPinButton from '../ForgotPinButton';
import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper';

interface PinPaymentMethodProps {
  alreadyHavePIN?: boolean;
}

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

function PinPaymentMethod({ alreadyHavePIN }: PinPaymentMethodProps) {
  const [pin, setPin] = useState(Array(4).fill(''))

  const handleChangeText = (text : string, index : number) => {
    if(!isNaN(Number(text))) {
      let newPIN = pin
      newPIN[index] = text;
      setPin(newPIN)

      pin.forEach((item) => {
        if(item === "") {
          return ;
        }
        console.log('submit')
      })
      console.log('teste')
    } 
  }
  return (
    <>
      <KeyboardAvoidingWrapper >
        <>
          <View style={styles.dotInputContainer}>
            {pin.map((item, index) => {
              return (
                <DotInputNumeric 
                  autoFocusValue={index === 0 ? true : false}
                  handleChangeTextFunction={(text) => handleChangeText(text, index)} 
                  key={index}   
                />
              )
            })}
          </View>

          <ForgotPinButton />
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

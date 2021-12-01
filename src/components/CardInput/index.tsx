import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { CardField, CardFieldInput } from '@stripe/stripe-react-native';
import Input from '../Input';

interface CardInputProps {
  setValue: (e : CardFieldInput.Details) => void;
}

function CardInput({ setValue }: CardInputProps) {
  return (
    <>
      <View style={styles.container}>
        <Input handleChangeFunction={() => console.log('testing')} placeholder={'test'}/>
        <CardField 
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={styles.card}
          postalCodeEnabled={false}
          style={styles.cardContainer}
          onCardChange={value => setValue(value)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%'
  }, 

  card: {
    backgroundColor: "#CCC",
    color: 'black'
  },

  cardContainer: {
    height: 50,
    marginVertical: 20,
  }
})

export default CardInput;

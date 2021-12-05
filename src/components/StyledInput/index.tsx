import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface StyledInputProps {
  handleChangeFunction: (e: string) => void;
  placeholder: string;
  text?: string;
}

function StyledInput({ text, handleChangeFunction, placeholder }: StyledInputProps) {
  return (
    <>
      <View style={[styles.container]}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{placeholder}</Text>
        </View>

        <TextInput
          value={text}
          onChangeText={(text) => handleChangeFunction(text)}
          style={styles.input}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,

    marginTop: 10,
    marginBottom: 10,

    borderWidth: 1,
    borderColor: globalStyles.gray,
  },

  input: {
    padding: 10,
    color: globalStyles.darkGray,
  },

  text: {
    paddingLeft: 10,
    paddingRight: 10,

    fontSize: 14,
    color: globalStyles.gray,
  },

  textContainer: {
    padding: 2,
    backgroundColor: '#fff',

    position: 'absolute',
    top: -10,
    left: 10,

    zIndex: 10,
    elevation: 10,
  },
});

export default StyledInput;

import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface StyledInputProps {
  handleChangeFunction: (e: string) => void;
  placeholder: string;
  text?: string;
  width?: number;
}

function StyledInput({ text, handleChangeFunction, placeholder, width }: StyledInputProps) {
  return (
    <>
      <View style={styles.inputContainer}>
        <View style={[styles.container, { width: width ?? '90%' }]}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{placeholder}</Text>
          </View>

          <TextInput
            value={text}
            onChangeText={(text) => handleChangeFunction(text)}
            style={styles.input}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,

    borderWidth: 1,
    borderColor: globalStyles.gray,
    borderRadius: 5,
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

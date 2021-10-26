import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface DotInputNumericProps {
  handleChangeTextFunction: (text : string) => void;
  autoFocusValue: boolean
}

function DotInputNumeric({ handleChangeTextFunction, autoFocusValue}: DotInputNumericProps) {
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput 
          onChangeText={(text) => handleChangeTextFunction(text)} 
          keyboardType={'numeric'} 
          autoFocus={autoFocusValue}
          maxLength={1} 
          style={styles.input} />     
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 10,

    backgroundColor: globalStyles.lightGray,

    borderRadius: 50,
    
  },

  input: {
    flex: 1,

    textAlign: 'center',
  }
})

export default DotInputNumeric;

import React, { ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface ButtonProps {
  text: string;
  handleClick: () => void;
}

function Button({ text, handleClick }: ButtonProps) {
  return (
    <>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClick}
          style={styles.btn}
        >
          <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,

    alignItems: 'center',
  },
  btn: {
    width: 280,
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: globalStyles.mainColor,
    borderRadius: 15,
  },

  btnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalStyles.white,
  },
});

export default Button;

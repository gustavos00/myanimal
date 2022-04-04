import React, { ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface ButtonProps {
  handleClick: (e?: any) => void;
  text: string;
  width?: string | number;
  isBordered?: boolean;
}

function Button({ text, handleClick, width, isBordered }: ButtonProps) {
  if (isBordered) {
    return (
      <>
        <View style={[styles.btnContainer, !width && { width: '100%' }]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleClick}
            style={[styles.borderedBtn, !width ? { width: 280 } : { width }]}
          >
            <Text style={styles.borderedBtnText}>{text}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={[styles.btnContainer, !width && { width: '100%' }]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleClick}
            style={[styles.filledBtn, !width ? { width: 280 } : { width }]}
          >
            <Text style={styles.btnText}>{text}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 10,
    marginBottom: 10,

    alignItems: 'center',
  },

  borderedBtn: {
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 3.3,
    borderColor: globalStyles.mainColor,
    borderRadius: 15,
  },

  filledBtn: {
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: globalStyles.mainColor,
    borderRadius: 15,
  },

  borderedBtnText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: globalStyles.mainColor,
  },

  btnText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: globalStyles.white,
  },
});

export default Button;

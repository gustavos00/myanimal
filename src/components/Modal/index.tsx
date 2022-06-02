import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../assets/styles/global';
import Button from '../Button';

interface ModalProps {
  falseFunction: () => void;
  trueFunction: () => void;
  title: string;
  text: string;
  borderedButtonText?: string;
  filledButtonText?: string;
}

function Modal({
  falseFunction,
  trueFunction,
  title,
  text,
  borderedButtonText,
  filledButtonText,
}: ModalProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.buttonsContainer}>
        {borderedButtonText && (
          <Button isBordered width={130} text={borderedButtonText} handleClick={falseFunction} />
        )}

        {filledButtonText && (
          <Button width={130} text={filledButtonText} handleClick={trueFunction} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: globalStyles.fullDeviceWidth * 0.8,
    padding: 10,

    alignItems: 'center',

    borderRadius: 15,
    backgroundColor: '#ffffff',
  },

  buttonsContainer: {
    width: globalStyles.fullDeviceWidth * 0.8,
    marginTop: 10,

    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28,

    color: globalStyles.black,
  },

  text: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',

    color: globalStyles.black,
  },

  button: {
    width: globalStyles.fullDeviceWidth * 0.3,
    height: globalStyles.fullDeviceHeight / 25,
    marginHorizontal: 10,

    borderRadius: 7,
    borderWidth: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonsText: {
    fontWeight: '600',
    letterSpacing: 1,
    color: '#fff',
  },
});

export default Modal;

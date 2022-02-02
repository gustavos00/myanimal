import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface ModalProps {
  falseFunction: () => void;
  trueFunction: () => void;
  title: string;
  text: string;
  noButtonText: string;
  yesButtonText: string;
}

function Modal({
  falseFunction,
  trueFunction,
  title,
  text,
  noButtonText,
  yesButtonText,
}: ModalProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={falseFunction}
          style={[styles.button, { borderColor: '#D1192A' }]}
        >
          <Text style={[styles.buttonsText, {color: '#D1192A'}]}>{noButtonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={trueFunction}
          style={[styles.button, { borderColor: 'green' }]}
        >
          <Text style={[styles.buttonsText, {color: 'green'}]}>{yesButtonText}</Text>
        </TouchableOpacity>
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
    marginTop: 20,
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

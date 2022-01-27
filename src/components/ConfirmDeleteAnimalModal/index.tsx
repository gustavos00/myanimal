import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface ConfirmDeleteAnimalModalProps {
  falseFunction: () => void,
  trueFunction: () => void,
}

function ConfirmDeleteAnimalModal({falseFunction, trueFunction}: ConfirmDeleteAnimalModalProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uhm, are you sure?</Text>
      <Text style={styles.text}>Are you sure you will permanently delete an animal?</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity activeOpacity={.7} onPress={falseFunction} style={[styles.button, { backgroundColor: '#D1192A' }]}>
          <Text style={styles.buttonsText}>Nevermind</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.7} onPress={trueFunction} style={[styles.button, { backgroundColor: 'green' }]}>
          <Text style={styles.buttonsText}>Delete</Text>
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
    width: globalStyles.fullDeviceWidth * .3,
    height: globalStyles.fullDeviceHeight / 25,
    marginHorizontal: 10,

    borderRadius: 7,

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonsText: {
    fontWeight: '600',
    letterSpacing: 1,
    color: '#fff',
  }
});

export default ConfirmDeleteAnimalModal;

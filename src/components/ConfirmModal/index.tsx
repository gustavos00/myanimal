import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import globalStyles from '../../assets/styles/global';
import BackgroundFilter from '../BackgroundFilter/index';

interface ConfirmModalProps {
  text: string,
  confirmFunction: () => void,
  closeFunction: Dispatch<SetStateAction<boolean | object>>
}

function ConfirmModal({ text, confirmFunction, closeFunction }: ConfirmModalProps) {
  return (
    <>
      <BackgroundFilter>
        <View style={styles.backgroundContainer}>
          <View style={styles.background}>
            <Text>{text}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.yesBtn}>
                <Text>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => closeFunction(false)} style={styles.noBtn}>
                <Text>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BackgroundFilter>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',
  }, 

  background: {
    width: 200,
    height: 100,
    
    backgroundColor: globalStyles.white
  },

  buttonContainer: {
    width: '100%',

    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  yesBtn: {
    padding: 10,
    width: 50,

    backgroundColor: 'green',
  },

  noBtn: {
    padding: 10,
    width: 50,

    backgroundColor: 'red',
  },
  
})

export default ConfirmModal;

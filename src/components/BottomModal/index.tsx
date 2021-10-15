import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface BottomModalProps {
  children: ReactNode;
  modalHeight: number
}

function BottomModal({ children, modalHeight }: BottomModalProps) {
  return (
    <>
      <View style={[styles.modal, {height: modalHeight}]}>
        <View style={styles.topBar}></View>
        {children}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: '100%',

    alignItems: 'center',

    position: 'absolute',
    bottom: 0,

    backgroundColor: globalStyles.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  topBar: {
    width: 90,
    height: 5,
    marginTop: 10,
    marginBottom: 30,

    backgroundColor: globalStyles.darkGray,
    borderRadius: 100,
  }
})

export default BottomModal;

import React from 'react';
import { View, StyleSheet} from 'react-native';
import globalStyles from '../../assets/styles/global';

function Underline() {
  return (
    <>
      <View style={styles.underLine}></View>
    </>
  );
}

const styles = StyleSheet.create({
  underLine: {
    width: '100%',
    height: 1,
    marginTop: 16,

    opacity: .6,

    backgroundColor: globalStyles.lightGray
  }
})

export default Underline;

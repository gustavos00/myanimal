import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface ActionsElementsProps {}

function ActionsElements({}: ActionsElementsProps) {
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity activeOpacity={0.7} style={styles.acceptRequest}>
        <Text>Accept</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} style={styles.declineRequest}>
        <Text>Decline</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: globalStyles.fullDeviceWidth,
  },

  actionsContainer: {
    flexDirection: 'row',
  },

  acceptRequest: {
    width: 100,
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'green',
  },

  declineRequest: {
    width: 100,
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'red',
  },
});

export default ActionsElements;

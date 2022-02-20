import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface ActionsElementsProps {
  trueText?: string;
  falseText?: string;

  trueColor?: string;
  falseColor?: string;

  trueFunction?: () => void;
  falseFunction?: () => void;
}

function ActionsElements({
  trueText,
  falseText,
  trueColor,
  falseColor,
  trueFunction,
  falseFunction,
}: ActionsElementsProps) {
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={trueFunction}
        style={[
          styles.acceptRequest,
          { backgroundColor: trueColor ?? '#145DA0' },
        ]}
      >
        <Text style={styles.acceptAndDeclineRequestText}>{trueText}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={falseFunction}
        style={[
          styles.declineRequest,
          { backgroundColor: falseColor ?? '#D1192A' },
        ]}
      >
        <Text style={styles.acceptAndDeclineRequestText}>{falseText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: globalStyles.fullDeviceWidth,
  },

  actionsContainer: {
    height: '100%',
    paddingRight: 30,
    
    flexDirection: 'row',
  },

  acceptRequest: {
    width: 100,
    height: '100%',

    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'green',
  },

  acceptAndDeclineRequestText: {
    fontWeight: '600',
    letterSpacing: 1,
    color: '#fff',
    textAlign: 'center'
  },

  declineRequest: {
    width: 100,
    height: '100%',

    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'red',
  },
});

export default ActionsElements;

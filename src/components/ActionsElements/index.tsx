import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../../assets/styles/global';

interface ActionsElementsProps {
  trueText: string;
  falseText: string;

  trueColor?: string;
  falseColor?: string;

  trueFunction: () => void;
  falseFunction: () => void;
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
          { backgroundColor: trueColor ?? 'green' },
        ]}
      >
        <Text>{trueText}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={falseFunction}
        style={[
          styles.declineRequest,
          { backgroundColor: falseColor ?? 'red' },
        ]}
      >
        <Text>{falseText}</Text>
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

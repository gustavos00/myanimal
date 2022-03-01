import React from 'react';

import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../../assets/styles/global';
import Background from '../Background';

interface SmallButtonProps {
  handleClick: () => void;

  text: string;
  borderColor?: string;
  textColor?: string;
  backgroundColor?: string;
}

function SmallButton({
  handleClick,
  text,
  borderColor,
  textColor,
  backgroundColor,
}: SmallButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleClick}
      style={[
        styles.button,
        !!borderColor && { borderColor, borderWidth: 2, },
        !!backgroundColor && { backgroundColor },
      ]}
    >
      <Text style={[styles.title, !!textColor && { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: globalStyles.fullDeviceWidth * 0.38,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 15,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
  },
});

export default SmallButton;

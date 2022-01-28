import React, { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Scroll from '../Scroll';

interface KeyboardAvoidingWrapperProps {
  children: ReactNode;
}

function KeyboardAvoidingWrapper({ children }: KeyboardAvoidingWrapperProps) {
  return (
    <>
      <KeyboardAvoidingView>
        <Scroll>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
        </Scroll>
      </KeyboardAvoidingView>
    </>
  );
}

export default KeyboardAvoidingWrapper;

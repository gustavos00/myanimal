import React, { ReactNode } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import Scroll from '../Scroll';

interface KeyboardAvoidingWrapperProps {
  children: ReactNode;
  aligned?: boolean;
  withoutMargin?: boolean;
}

function KeyboardAvoidingWrapper({ children, aligned,  withoutMargin }: KeyboardAvoidingWrapperProps) {
  return (
    <>
      <KeyboardAvoidingView>
        <Scroll withoutMargin={withoutMargin} aligned={aligned}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
        </Scroll>
      </KeyboardAvoidingView>
    </>
  );
}

export default KeyboardAvoidingWrapper;

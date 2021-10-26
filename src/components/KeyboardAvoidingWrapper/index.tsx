import React, { ReactNode } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';

interface KeyboardAvoidingWrapperProps {
  children: ReactNode;
}

function KeyboardAvoidingWrapper({ children }: KeyboardAvoidingWrapperProps) {
  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView>
          <TouchableWithoutFeedback style={{flex: 1, backgroundColor: 'red'}}onPress={Keyboard.dismiss}>
            {children}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

export default KeyboardAvoidingWrapper;

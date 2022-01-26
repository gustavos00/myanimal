import React, { ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface KeyboardAvoidingWrapperProps {
  children: ReactNode;
}

function KeyboardAvoidingWrapper({ children }: KeyboardAvoidingWrapperProps) {
  return (
    <>
      <KeyboardAvoidingView>
        <ScrollView>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
          >
            {children}
          </TouchableWithoutFeedback>
          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

export default KeyboardAvoidingWrapper;

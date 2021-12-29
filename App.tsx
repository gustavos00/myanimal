import React from 'react';
import MainStack from './src/navigator/MainStack';
import { AuthProvider } from './src/contexts/user';

export default function App() {
  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>
  );
}

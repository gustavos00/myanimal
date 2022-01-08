import React from 'react';
import MainStack from './src/navigator/MainStack';
import { UserProvider } from './src/contexts/user';
import { AuthProvider } from './src/contexts/auth';

export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <MainStack />
      </AuthProvider>
    </UserProvider>
  );
}

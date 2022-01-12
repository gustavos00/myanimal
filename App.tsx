import React from 'react';
import MainStack from './src/navigator/MainStack';
import { UserProvider } from './src/contexts/user';
import { AuthProvider } from './src/contexts/auth';
import { FriendsProvider } from './src/contexts/friends';

export default function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <FriendsProvider>
          <MainStack />
        </FriendsProvider>
      </AuthProvider>
    </UserProvider>
  );
}

import React from 'react';

import MainStack from './src/navigator/MainStack';
import { UserProvider } from './src/contexts/user';
import { AuthProvider } from './src/contexts/auth';
import { FriendsProvider } from './src/contexts/friends';
import { LogBox } from 'react-native';
import { StatesProvider } from './src/contexts/states';

export default function App() {
  //LogBox.ignoreAllLogs()
  return (
    <StatesProvider>
      <UserProvider>
        <AuthProvider>
          <FriendsProvider>
            <MainStack />
          </FriendsProvider>
        </AuthProvider>
      </UserProvider>
    </StatesProvider>
  );
}

import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { FriendsData } from '../types/FriendsData';

interface AuthContextData {
  setFriends: Dispatch<SetStateAction<FriendsData[] | undefined>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [friends, setFriends] = useState<Array<FriendsData>>();

  const updateFriendRequestToDone = (index: number) => {
  }

  return <AuthContext.Provider value={{ setFriends }}>{children}</AuthContext.Provider>;
}

export default AuthContext;

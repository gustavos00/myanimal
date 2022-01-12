import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { FriendsData } from '../types/FriendsData';

interface FriendsContextData {
  pendingFriends: Array<FriendsData> | undefined;
  acceptedFriends: Array<FriendsData> | undefined;
  handlePendingFriends: (data: Array<FriendsData>) => void;
  acceptFriendRequest: (index: number) => void;
}

const FriendsContext = createContext<FriendsContextData>({} as FriendsContextData);

export function FriendsProvider({ children }: any) {
  const [pendingFriends, setPendingFriends] = useState<Array<FriendsData>>();
  const [acceptedFriends, setAcceptedFriends] = useState<Array<FriendsData>>([]);

  const handlePendingFriends = (data: Array<FriendsData>) => {
    setPendingFriends(data);
  };

  const acceptFriendRequest = (index: number) => {
    if (!pendingFriends) return;

    const tempPendingArray = pendingFriends;
    const tempAcceptedArray = acceptedFriends;
    const tempObj = tempPendingArray[index];

    tempObj.status = 'Accepted';
    tempPendingArray.slice(index)
    tempAcceptedArray.push(tempObj);

    setPendingFriends(tempPendingArray)
    setAcceptedFriends(tempAcceptedArray);
    console.log(acceptedFriends)
  };

  return (
    <FriendsContext.Provider
      value={{ pendingFriends, acceptedFriends, handlePendingFriends, acceptFriendRequest }}
    >
      {children}
    </FriendsContext.Provider>
  );
}

export default FriendsContext;

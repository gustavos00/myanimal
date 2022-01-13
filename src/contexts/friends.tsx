import React, { createContext, useState } from 'react';
import { FriendsData } from '../types/FriendsData';

import api from '../api/api';

interface FriendsContextData {
  pendingFriends: Array<FriendsData> | undefined;
  acceptedFriends: Array<FriendsData> | undefined;
  handlePendingFriends: (data: Array<FriendsData>) => void;
  handleAcceptedFriends: (data: Array<FriendsData>) => void;
  acceptFriendsRequest: (index: number) => void;
}

const FriendsContext = createContext<FriendsContextData>({} as FriendsContextData);

export function FriendsProvider({ children }: any) {
  const [pendingFriends, setPendingFriends] = useState<Array<FriendsData>>();
  const [acceptedFriends, setAcceptedFriends] = useState<Array<FriendsData>>([]);

  const handlePendingFriends = (data: Array<FriendsData>) => {
    setPendingFriends(data);
  };

  const handleAcceptedFriends = (data: Array<FriendsData>) => {
    setAcceptedFriends(data);
  };

  const acceptFriendsRequest = async (index: number) => {
    if (!pendingFriends) return console.log('Pending friends dont exist');

    const tempPendingArray = pendingFriends;
    const tempObj = tempPendingArray[index];
    const idFriendsElement = tempPendingArray[index].idfriends;

    tempObj.status = 'Accepted';
    tempPendingArray.splice(index, 1);

    setPendingFriends(tempPendingArray);
    setAcceptedFriends((acceptedFriends) => {
      const alreadyContainsStatus =
        acceptedFriends.filter((e) => e.idfriends === acceptedFriends[index].idfriends).length > 0;

      if (alreadyContainsStatus) {
        return [...acceptedFriends];
      }
      return [...(acceptedFriends ?? []), tempObj];
    });

    const response = await api.get(`/user/friends/accept?id=${idFriendsElement}`);
    console.log(response.data);
  };

  return (
    <FriendsContext.Provider
      value={{
        pendingFriends,
        acceptedFriends,
        handlePendingFriends,
        handleAcceptedFriends,
        acceptFriendsRequest,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
}

export default FriendsContext;

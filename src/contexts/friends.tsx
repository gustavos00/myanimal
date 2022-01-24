import React, { createContext, useState } from 'react';
import { FriendsData } from '../types/FriendsData';

import api from '../api/api';
import storage from '../utils/storage';
import { showError } from '../utils/error';

interface FriendsContextData {
  pendingFriends: Array<FriendsData> | undefined;
  acceptedFriends: Array<FriendsData> | undefined;
  handlePendingFriends: (data: Array<FriendsData>) => void;
  handleAcceptedFriends: (data: Array<FriendsData>) => void;
  acceptFriendsRequest: (index: number) => void;
  declineFriendsRequests: (index: number) => void;
}

interface AcceptFriendsRequestResponse {
  fingerprint: string;
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

  const declineFriendsRequests = async (index: number) => {
    console.log('fix');
  };

  const acceptFriendsRequest = async (index: number) => {
    if (!pendingFriends) return console.log('Pending friends dont exist');

    const tempPendingArray = pendingFriends;
    const tempObj = tempPendingArray[index];
    const idFriendsElement = tempPendingArray[index].idfriends;
    let response;

    try {
      response = await api.get(`/user/friends/accept?id=${idFriendsElement}`);
    } catch (e) {
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }

    if (!!response) {
      const responseData: AcceptFriendsRequestResponse = response.data;
      const fingerprintStorageName = `${tempObj.fromWho}-${tempObj.toWhom}`;

      tempObj.status = 'Accepted';
      tempPendingArray.splice(index, 1);

      setPendingFriends(tempPendingArray);
      setAcceptedFriends((acceptedFriends) => {
        const alreadyContainsStatus =
          acceptedFriends.filter((e) => e.idfriends === acceptedFriends[index].idfriends).length >
          0;

        if (alreadyContainsStatus) {
          return [...acceptedFriends];
        }
        return [...(acceptedFriends ?? []), tempObj];
      });

      storage.save({
        key: fingerprintStorageName,
        data: { fingerprint: responseData.fingerprint },
      });

      if (response) return responseData.fingerprint;
    }

    return false;
  };

  return (
    <FriendsContext.Provider
      value={{
        pendingFriends,
        acceptedFriends,
        handlePendingFriends,
        handleAcceptedFriends,
        acceptFriendsRequest,
        declineFriendsRequests,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
}

export default FriendsContext;

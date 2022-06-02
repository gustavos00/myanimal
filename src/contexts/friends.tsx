import React, { createContext, useContext, useState } from 'react';
import { FriendsData } from '../types/FriendsData';

import api from '../api/api';
import storage from '../utils/storage';
import { showError } from '../utils/error';
import StatesContext from './states';
import { generateUrlSearchParams } from '../utils/URLSearchParams';

interface FriendsContextData {
  pendingFriends: Array<FriendsData> | undefined;
  acceptedFriends: Array<FriendsData> | undefined;
  setPendingFriends: (data: Array<FriendsData>) => void;
  setAcceptedFriends: (data: Array<FriendsData>) => void;
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

  const { setIsLoading } = useContext(StatesContext);

  const declineFriendsRequests = async (index: number) => {
    if (!pendingFriends) return console.log('Pending friends dont exist');

    const tempPendingArray = pendingFriends;
    const idFriendsElement = tempPendingArray[index].idfriends;

    try {
      setIsLoading(true);
      const data = generateUrlSearchParams({ id: idFriendsElement });
      await api.post('/user/friends/decline', data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }

    const pendingFriendIndex = tempPendingArray.findIndex(
      (element) => element.idfriends == idFriendsElement
    );
    tempPendingArray.splice(pendingFriendIndex, 1);
    setPendingFriends([...tempPendingArray]);
  };

  const acceptFriendsRequest = async (index: number) => {
    if (!pendingFriends) return console.log('Pending friends dont exist');

    const tempPendingArray = pendingFriends;
    const tempObj = tempPendingArray[index];
    const idFriendsElement = tempPendingArray[index].idfriends;
    let response;

    try {
      setIsLoading(true);
      const data = generateUrlSearchParams({ id: idFriendsElement });
      response = await api.post('/user/friends/accept', data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }

    if (!!response) {
      const responseData: any = response.data;
      const fingerprintStorageName = `${tempObj.userFriendsIdFromWho}-${tempObj.userFriendsIdToWho}`;

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
        setPendingFriends,
        setAcceptedFriends,
        acceptFriendsRequest,
        declineFriendsRequests,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
}

export default FriendsContext;

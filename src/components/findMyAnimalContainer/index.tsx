import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { showError } from '../../utils/error';

import api from '../../api/api';

import BottomModal from '../BottomModal';
import StyledInput from '../StyledInput';
import Button from '../Button';
import { Alert } from 'react-native';

interface FindMyAnimalContainerProps {
  closeBottomModalFunction: (e: boolean) => void;
  setLoadingFunction: (e: boolean) => void;
}

interface ResponseData {
  message?: string;
}

function FindMyAnimalContainer({
  closeBottomModalFunction,
  setLoadingFunction,
}: FindMyAnimalContainerProps) {
  const [trackNumber, setTrackNumber] = useState<string>();

  const navigation = useNavigation();

  const handleSubmitForm = async () => {
    let response;

    try {
      setLoadingFunction(true);
      response = await api.get(`/animal/findMyAnimal/?tracking=${trackNumber}`);

      const data: ResponseData = response.data;

      if (!!data) {
        navigation.navigate(
          'FindMyAnimal' as never,
          {
            ownerData: data,
          } as never
        );
      } else {
        setTrackNumber('');
      }
      setLoadingFunction(false);
    } catch (e) {
      setLoadingFunction(false)
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }
  };
  return (
    <>
      <BottomModal swipeDownFunction={() => closeBottomModalFunction(false)} modalHeight={250}>
        <StyledInput
          width={'90%'}
          placeholder={'Track number'}
          text={trackNumber}
          handleChangeFunction={(e: string) => setTrackNumber(e)}
        />

        <Button text={'Find owner animal'} handleClick={handleSubmitForm} />
      </BottomModal>
    </>
  );
}

export default FindMyAnimalContainer;

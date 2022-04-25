import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Text, View } from 'react-native';

import api from '../../api/api';
import globalStyles from '../../assets/styles/global';
import StatesContext from '../../contexts/states';
import UserContext from '../../contexts/user';
import { showError } from '../../utils/error';
import { generateUrlSearchParams } from '../../utils/URLSearchParams';

import Button from '../Button';
import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper';
import Loading from '../Loading';
import StyledInput from '../StyledInput';

interface CreateAddressProps {
  changeHaveAddressStateFunction: Dispatch<SetStateAction<boolean>>;
}

function CreateAddress({ changeHaveAddressStateFunction }: CreateAddressProps) {
  const [streetName, setStreetName] = useState<string>();
  const [doorNumber, setDoorNumber] = useState<string>();
  const [postalCode, setPostalCode] = useState<string>();
  const [parish, setParish] = useState<string>();
  const [locality, setLocality] = useState<string>();
  const [error, setError] = useState<string>();

  const { isLoading, setIsLoading } = useContext(StatesContext);
  const { user } = useContext(UserContext);

  const handleText = (
    e: string,
    stringLenght: number,
    setFunction: Dispatch<SetStateAction<string | undefined>>
  ) => {
    if (!!error) {
      setFunction(e);
      return setError(error);
    }

    if (e.length > stringLenght) {
      setError('Please, insert a valid text.');
      setFunction(e);
    } else {
      setError('');
      setFunction(e);
    }
  };

  const handleSubmitForm = async () => {
    if (streetName && doorNumber && postalCode) {
      const tempObj = {
        parishName: parish,
        locationName: locality,
        streetName,
        doorNumber,
        postalCode,
        parishName: parish,
        locationName: locality,
        email: user?.email ?? '',
        isVeterinarian: user?.isVeterinarian,
      };
      const addressData = generateUrlSearchParams(tempObj);

      try {
        setIsLoading(true);
        await api.post('user/createAddress', addressData);
        setIsLoading(false);
        changeHaveAddressStateFunction(true);

        //Dynamic push user data
      } catch (e) {
        return showError('Error: ' + e, 'Apparently there was an error, try again');
      }
    }
  };

  return (
    <View style={{ width: globalStyles.fullDeviceWidth }}>
      <KeyboardAvoidingWrapper aligned withoutMargin>
        <>
          <StyledInput
            text={streetName}
            width={'80%'}
            placeholder={'Street name'}
            handleChangeFunction={(e: string) => handleText(e, 100, setStreetName)}
          />
          <StyledInput
            text={doorNumber}
            width={'80%'}
            placeholder={'Door number'}
            handleChangeFunction={(e: string) => handleText(e, 10, setDoorNumber)}
          />
          <StyledInput
            text={postalCode}
            width={'80%'}
            placeholder={'Postal Code'}
            handleChangeFunction={(e: string) => handleText(e, 12, setPostalCode)}
          />

          <StyledInput
            text={parish}
            width={'80%'}
            placeholder={'City'}
            handleChangeFunction={(e: string) => handleText(e, 100, setParish)}
          />
          <StyledInput
            text={locality}
            width={'80%'}
            placeholder={'Locality'}
            handleChangeFunction={(e: string) => handleText(e, 100, setLocality)}
          />

          <Text>{error}</Text>

          <Button text={'Create address'} handleClick={handleSubmitForm} />
        </>
      </KeyboardAvoidingWrapper>
    </View>
  );
}

export default CreateAddress;

import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { View } from 'react-native';

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
    setFunction: Dispatch<SetStateAction<string | undefined>>,
    type?: string
  ) => {
    if (type === 'number' && e.length > stringLenght) {
      if (isNaN(Number(e))) {
        setError('Please, insert a valid age');
      } else {
        setError('');
        setFunction(e);
      }
    } else {
      //Verify string
      setFunction(e);
    }
  };

  const handleSubmitForm = async () => {
    if (streetName && doorNumber && postalCode) {
      const tempObj = {
        streetName,
        doorNumber,
        postalCode,
        email: user?.email ?? '',
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
            handleChangeFunction={(e: string) => handleText(e, 4, setStreetName)}
          />
          <StyledInput
            text={doorNumber}
            width={'80%'}
            placeholder={'Door number'}
            handleChangeFunction={(e: string) => handleText(e, 4, setDoorNumber, 'number')}
          />
          <StyledInput
            text={postalCode}
            width={'80%'}
            placeholder={'Postal Code'}
            handleChangeFunction={(e: string) => handleText(e, 4, setPostalCode)}
          />

          <StyledInput
            text={parish}
            width={'80%'}
            placeholder={'Parish'}
            handleChangeFunction={(e: string) => handleText(e, 4, setParish)}
          />
          <StyledInput
            text={locality}
            width={'80%'}
            placeholder={'Locality'}
            handleChangeFunction={(e: string) => handleText(e, 4, setLocality)}
          />

          <Button text={'Create address'} handleClick={handleSubmitForm} />
        </>
      </KeyboardAvoidingWrapper>

      {isLoading && <Loading />}
    </View>
  );
}

export default CreateAddress;

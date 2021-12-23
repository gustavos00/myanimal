import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

import api from '../../api/api';
import AuthContext from '../../contexts/user';
import { GoogleSignInProps } from '../../interfaces/GoogleSignInProps';
import { showError } from '../../utils/error';

import Button from '../Button';
import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper';
import Loading from '../Loading';
import StyledInput from '../StyledInput';

interface CreateAddressProps { 
  changeHaveAddressStateFunction: Dispatch<SetStateAction<boolean>>
}

function CreateAddress({ changeHaveAddressStateFunction } : CreateAddressProps) {
  const [streetName, setStreetName] = useState<string>();
  const [doorNumber, setDoorNumber] = useState<string>();
  const [postalCode, setPostalCode] = useState<string>();
  const [parish, setParish] = useState<string>();
  const [locality, setLocality] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

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
      const addressData = new URLSearchParams();
      addressData.append('streetName', streetName);
      addressData.append('doorNumber', doorNumber);
      addressData.append('postalCode', postalCode);
      addressData.append('email', user?.email ?? '')

      try {
        setIsLoading(true);
        const response = await api.post('user/createAddress', addressData);
        setIsLoading(false);
        changeHaveAddressStateFunction(true)

        //Dynamic push user data
      } catch (e) {
        showError('Error: ' + e, 'Apparently there was an error, try again');
      }
    }
  };

  return (
    <>
      <KeyboardAvoidingWrapper>
        <>
          <StyledInput
            text={streetName}
            placeholder={'Street name'}
            handleChangeFunction={(e: string) =>
              handleText(e, 4, setStreetName)
            }
          />
          <StyledInput
            text={doorNumber}
            placeholder={'Door number'}
            handleChangeFunction={(e: string) =>
              handleText(e, 4, setDoorNumber, 'number')
            }
          />
          <StyledInput
            text={postalCode}
            placeholder={'Postal Code'}
            handleChangeFunction={(e: string) =>
              handleText(e, 4, setPostalCode)
            }
          />

          <StyledInput
            text={parish}
            placeholder={'Parish'}
            handleChangeFunction={(e: string) => handleText(e, 4, setParish)}
          />
          <StyledInput
            text={locality}
            placeholder={'Locality'}
            handleChangeFunction={(e: string) => handleText(e, 4, setLocality)}
          />

          <Button text={'Create address'} handleClick={handleSubmitForm} />
        </>
      </KeyboardAvoidingWrapper>

      {isLoading && (
        <>
          <Loading />
        </>
      )}
    </>
  );
}

export default CreateAddress;

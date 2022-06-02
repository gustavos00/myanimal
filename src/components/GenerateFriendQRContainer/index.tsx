import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { showError } from '../../utils/error';

import api from '../../api/api';

import QRCode from 'react-native-qrcode-svg';
import globalStyles from '../../assets/styles/global';
import BottomModal from '../BottomModal';

import Loading from '../Loading'
import StatesContext from '../../contexts/states'
import { generateUrlSearchParams } from '../../utils/URLSearchParams';


interface userDataProps {
  email?: string,
  id?: number 
}

interface GenerateFriendQrContainerProps {
  closeBottomModalFunction: (e: boolean) => void;
  userData: userDataProps;
}

function GenerateFriendQrContainer({
  closeBottomModalFunction,
  userData,
}: GenerateFriendQrContainerProps) {
  const [token, setToken] = useState();
  const { isLoading, setIsLoading } = useContext(StatesContext);

  if(!userData.email) return <></>;

  const generateQR = async () => {
    if(!userData) return console.log('error getting user data');
    try {
      setIsLoading(true)

      const data = generateUrlSearchParams(userData)
      const response = await api.post('user/friends/token', data);
      setIsLoading(false)

      const { token } = response.data as any
      setToken(token)
    } catch (e) {
      setIsLoading(false)
      return showError('Error: ' + e, 'Apparently there was an error, try again');
    }
  };

  useEffect(() => {
    const generateQRuseEffectFunction = async () => {
      setIsLoading(true)
      await generateQR()
    }

    generateQRuseEffectFunction()
  }, [])

  return (
    <>
      <BottomModal
        swipeDownFunction={() => closeBottomModalFunction(false)}
        modalHeight={350}
      >
        <>
          <Text style={styles.qrHeaderText}>
            Share this QR to receive a friend request!
          </Text>
          <View style={styles.qrContainer}>
            <QRCode
              value={token}
              size={200}
            />
          </View>
        </>
      </BottomModal>

      {isLoading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  qrContainer: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },

  qrHeaderText: {
    marginBottom: 30,

    opacity: 0.9,
    fontSize: 18,
    color: globalStyles.black,
  },
});

export default GenerateFriendQrContainer;

